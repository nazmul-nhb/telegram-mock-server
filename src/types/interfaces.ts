export interface IErrorObject extends Error {
	status?: number;
}

export interface IProductDetails {
	title: string;
	price: number;
	productImage: string;
}

