import { Document } from "mongoose";

export interface IProduct {
	title: string;
	price: number;
	productImage: string;
	createdAt: Date;
}

export type ProductDocument = IProduct & Document;

