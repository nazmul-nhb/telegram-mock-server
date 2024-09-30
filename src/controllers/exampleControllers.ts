import { NextFunction, Request, Response } from 'express';
import { IProductDetails } from '../types/interfaces';
import { Product } from '../models/exampleModel';

// Create Product(s)
export const createProduct = async (
	req: Request<{}, {}, IProductDetails | IProductDetails[]>,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Check if req.body is an array (for multiple products)
		if (Array.isArray(req.body)) {
			// Insert multiple products
			const savedProducts = await Product.insertMany(req.body);
			return res.status(201).send({
				success: true,
				insertedIds: savedProducts.map((product) => product._id),
				message: savedProducts.length + ' Products are Saved Successfully!',
			});
		} else {
			// Insert a single product
			const newProduct = new Product(req.body);
			const savedProduct = await newProduct.save();
			if (savedProduct?._id) {
				return res.status(201).send({
					success: true,
					insertedId: savedProduct._id,
					message: savedProduct.title + ' is Saved Successfully!',
				});
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Creating Product(s): ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

// Get all products
export const getProducts = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const [products, totalProducts] = await Promise.all([
			Product.find({}).sort({ createdAt: -1 }),
			Product.countDocuments(),
		]);

		if (products.length) {
			return res.status(200).send({
				success: true,
				totalProducts,
				products,
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'No Product Found in the Store!',
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Fetching Products: ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

// Get single product by id
export const getProduct = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ID = req.params.id;
		const product = await Product.findById(ID);

		if (product) {
			return res.status(200).send({
				success: true,
				product,
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'Product Not Found!',
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Fetching Product: ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

// Update a product by ID
export const updateProduct = async (
	req: Request<{ id: string }, {}, IProductDetails>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ID = req.params.id;
		const product = req.body;
		const updatedProduct = await Product.findByIdAndUpdate(ID, product, {
			new: true,
			runValidators: true,
		});

		if (updatedProduct) {
			return res.status(201).send({
				success: true,
				updatedProduct,
				message: updatedProduct.title + ' is Updated Successfully!',
			});
		} else {
			res.status(404).send({
				success: false,
				message: 'Product Not Found!',
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Updating Product: ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

// Delete a product by ID
export const deleteProduct = async (
	req: Request<{ id: string }, {}, {}>,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ID = req.params.id;

		const deletedProduct = await Product.findOneAndDelete({ _id: ID });

		if (!deletedProduct) {
			return res
				.status(404)
				.send({ success: false, message: 'Product Not Found!' });
		}

		res.status(200).send({
			success: true,
			message: deletedProduct?.title || 'Product' + 'is Deleted Successfully!',
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error('Error Deleting Product: ', error.message);
			res.status(400).send({
				success: false,
				message: error.message,
			});
		} else {
			next(error);
		}
	}
};

