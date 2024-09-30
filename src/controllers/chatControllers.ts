import { NextFunction, Request, Response } from 'express';
import { IChatDetails } from '../types/interfaces';
import { Chat } from '../models/chatModel';

// Create Chat(s)
export const createChat = async (
	req: Request<{}, {}, IChatDetails | IChatDetails[]>,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Check if req.body is an array (for multiple chats)
		if (Array.isArray(req.body)) {
			// Insert multiple chats
			const savedChats = await Chat.insertMany(req.body);
			return res.status(201).send({
				success: true,
				insertedIds: savedChats.map((chat) => chat._id),
				message: savedChats.length + ' Chats are Saved Successfully!',
			});
		} else {
			// Insert a single chat
			const newChat = new Chat(req.body);
			const savedChat = await newChat.save();
			if (savedChat?._id) {
				return res.status(201).send({
					success: true,
					insertedId: savedChat._id,
					message: savedChat.creator.name + "'s Chat is Saved Successfully!",
				});
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Creating Chat(s): ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

// Get all chats
export const getChats = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const [chats, totalChats] = await Promise.all([
			Chat.find({}).sort({ createdAt: -1 }),
			Chat.countDocuments(),
		]);

		if (chats.length) {
			return res.status(200).send({
				success: true,
				totalChats,
				chats,
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'No Chat Found in the DB!',
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Fetching Chats: ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

// Get single chat by id
export const getChat = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ID = req.params.id;
		const chat = await Chat.findById(ID);

		if (chat) {
			return res.status(200).send({
				success: true,
				chat,
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'Chat Not Found!',
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Fetching Chat: ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

// Update a chat by ID
export const updateChat = async (
	req: Request<{ id: string }, {}, IChatDetails>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ID = req.params.id;
		const chat = req.body;
		const updatedChat = await Chat.findByIdAndUpdate(ID, chat, {
			new: true,
			runValidators: true,
		});

		if (updatedChat) {
			return res.status(201).send({
				success: true,
				updatedChat,
				message: updatedChat.creator.name + ' is Updated Successfully!',
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'Chat Not Found!',
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Updating Chat: ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

// Delete a chat by ID
export const deleteChat = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ID = req.params.id;

		const deletedChat = await Chat.findOneAndDelete({ _id: ID });

		if (!deletedChat) {
			return res
				.status(404)
				.send({ success: false, message: 'Chat Not Found!' });
		}

		res.status(200).send({
			success: true,
			message: deletedChat?.creator.name || 'Chat' + 'is Deleted Successfully!',
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Deleting Chat: ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};
