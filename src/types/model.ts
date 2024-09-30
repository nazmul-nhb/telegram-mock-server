import { Document } from 'mongoose';

export interface IChat {
	creator: {
		name: string;
		updated_at: Date;
	};
}

export type ChatDocument = IChat & Document;
