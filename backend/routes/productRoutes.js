import express from 'express'
import Product from '../models/productModel.js'

const router = express.Router()

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.get('/', async (req, res, next) => {
	try {
		const products = await Product.find({})
		res.statusCode = 200

		res.json({
			success: true,
			message: 'Successfully retrieved Products',
			products
		})
	} catch (error) {
		res.statusCode = 404
		res.json({
			success: false,
			message: 'Products not found',
			error
		})
	}
})

// @desc Fetch a single product
// @route GET /api/products/:id
// @access Public
router.get('/:id', async (req, res, next) => {
	// const product = products.find((p) => p._id === req.params.id)
	const product = await Product.findById(req.params.id)

	if (product) {
		res.statusCode = 200

		res.json({
			success: true,
			message: 'Successfully retrieved product',
			product
		})
	} else {
		res.statusCode = 404
		res.json({
			success: false,
			message: 'Product not found'
		})
	}
})
export default router
