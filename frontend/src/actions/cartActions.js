import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`)

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data.product._id,
			name: data.product.name,
			image: data.product.image,
			price: data.product.price,
			qty
		}
	})

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
