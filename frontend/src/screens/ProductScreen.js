import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	useEffect(() => {
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	return (
		<>
			<Link to='/' className='btn btn-light my-3'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product.name}</h3>
							</ListGroup.Item>
							<ListGroup.Item>
								<Rating
									value={product.rating}
									text={`${product.numReviews} reseñas`}
								/>
							</ListGroup.Item>
							<ListGroup.Item>
								<p>
									Precio: <strong>${product.price}</strong>
								</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<p>Descripción: {product.description}</p>
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Precio: </Col>
										<Col>
											<strong>${product.price}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status: </Col>
										<Col>
											{product.countInStock > 0 ? 'Disponible' : 'Agotado'}
										</Col>
									</Row>
								</ListGroup.Item>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Cantidad</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(event) => {
														setQty(event.target.value)
													}}
												>
													{[...Array(product.countInStock).keys()].map(
														(qty) => {
															return (
																<option key={qty + 1} value={qty + 1}>
																	{qty + 1}
																</option>
															)
														}
													)}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn-block '
										type='button'
										disabled={product.countInStock === 0}
									>
										Añadir al Carrito
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
