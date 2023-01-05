import { 
  SET_PRODUCTS, 
  INCREASE, 
  DECREASE, 
  DELETE_PRODUCT, 
  SET_LOADING, 
  SET_CART_ID,
  CLEAR_CART
} from "../constants/contants"

const setProducts = (payload: any) => {
  return {
    type: SET_PRODUCTS,
    payload
  }
}

const setCartId = (payload: any) => {
  return {
    type: SET_CART_ID,
    payload
  }
}

const increase = (payload: any) => {
  return {
    type: INCREASE,
    payload
  }
}

const decrease = (payload: any) => {
  return {
    type: DECREASE,
    payload
  }
}

const deleteProduct = (payload: any) => {
  return {
    type: DELETE_PRODUCT,
    payload
  }
}

const clearCart= (payload: any) => {
  return {
    type: CLEAR_CART,
    payload
  }
}

const setLoading = (payload: any) => {
  return {
    type: SET_LOADING,
    payload
  }
}

export {
  setProducts,
  increase,
  decrease,
  deleteProduct,
  setLoading,
  setCartId,
  clearCart
}