import { Schema, model } from 'mongoose';
import { ChatDocument } from '../types/model';

export const ChatSchema = new Schema({
	creator: {
		name: {
			type: String,
			required: [true, 'UserName is Missing!'],
		},
		updated_at: { type: Date, default: Date.now },
	},
});

export const Chat = model<ChatDocument>('Chat', ChatSchema);
