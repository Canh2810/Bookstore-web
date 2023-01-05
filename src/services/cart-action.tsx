import axios from 'axios';

// Api
import { CART_API } from '../constants/api';

const getCart = async (userId: string): Promise<any> => {
  const res = await axios.get(CART_API + `${userId}`);
  return res.data.cart
}

const updateCart = async (cartId: string, productData: any): Promise<any> => {
  const values = { products: productData }
  const res = await axios.put(CART_API + `${cartId}`, values)
  return res.data
}

export { getCart, updateCart }