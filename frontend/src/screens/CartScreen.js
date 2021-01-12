import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id

	const qty = location.search ? Number(location.search.split('=')[1]) : 1

	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	const removeFromCartHandler = (id) => {}

	const checkoutHandler = () => {
		history.push('/login?redirect=shipping')
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Carrito de Compras</h1>
				{cartItems.length === 0 ? (
					<Message>
						Tu carrito está vacío... <Link to='/'>Volver</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => {
							console.log('item here', item.qty)
							return (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3}>
											<Link to={`/products/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={2}>
											{new Intl.NumberFormat('en-IN', {
												style: 'currency',
												currency: 'USD'
											}).format(item.price)}
										</Col>
										<Col md={2}>
											<Form.Control
												as='select'
												value={item.qty}
												onChange={(event) => {
													dispatch(
														addToCart(item.product, Number(event.target.value))
													)
												}}
											>
												{[...Array(item.countInStock).keys()].map((qty) => {
													return (
														<option key={qty + 1} value={qty + 1}>
															{qty + 1}
														</option>
													)
												})}
											</Form.Control>
										</Col>
										<Col md={2}>
											<Button
												type='button'
												variant='light'
												onClick={() => {
													removeFromCartHandler(item.product)
												}}
											>
												<i className='fas fa-trash'></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							)
						})}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>

							{new Intl.NumberFormat('en-IN', {
								style: 'currency',
								currency: 'USD'
							}).format(
								cartItems
									.reduce((acc, item) => acc + item.qty * item.price, 0)
									.toFixed(2)
							)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
								variant='primary'
							>
								Comprar
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	)
}

export default CartScreen
