import { Document } from 'mongoose';

export interface IChat {
	creator: {
		name: string;
		updated_at: Date;
	};
}

export type ChatDocument = IChat & Document;

export interface IMessage {
	message: string;
	created_at: Date;
}

export interface IMessages {
	sender_id: string;
	sender_name: string;
	messages: IMessage[];
}

export type MessageDocument = IMessage & Document;
