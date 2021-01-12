import express from 'express'
import dotenv from 'dotenv'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'

const app = express()

dotenv.config()

connectDB()

const PORT = process.env.PORT || 5000

app.get('/', (req, res, next) => {
	res.send({
		message: 'API is running'
	})
})

app.use('/api/products', productRoutes)

app.listen(PORT, () => {
	console.log(process.env.PORT)
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
})
