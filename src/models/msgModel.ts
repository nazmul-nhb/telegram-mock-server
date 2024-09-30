import { Schema, model } from 'mongoose';
import { MessageDocument } from '../types/model';

// Define the IMessage schema
export const MessageSchema = new Schema({
	message: {
		type: String,
		required: [true, 'Message Cannot be Empty!'],
	},
	created_at: { type: Date, default: Date.now },
});

// Define the IMessages schema
// const MessagesSchema = new Schema<IMessages>({
// 	sender_id: { type: String, required: true },
// 	sender_name: { type: String, required: true },
// 	messages: { type: [MessageSchema], required: true },
// });

export const Message = model<MessageDocument>('Message', MessageSchema);
