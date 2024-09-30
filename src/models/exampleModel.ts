import { Schema, model } from 'mongoose';
import { ProductDocument } from '../types/model';

export const ProductSchema = new Schema({
	title: {
		type: String,
		required: [true, 'Must Provide Product Title!'],
	},
	productImage: {
		type: String,
		required: [true, 'Must Provide Product Image Link!'],
	},
	price: {
		type: Number,
		required: [true, 'Must Provide Product Price!'],
	},
	createdAt: { type: Date, default: Date.now },
});

export const Product = model<ProductDocument>('Product', ProductSchema);

