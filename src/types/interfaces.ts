export interface IErrorObject extends Error {
	status?: number;
}

export interface IChatDetails {
	creator: {
		name: string;
	};
}
