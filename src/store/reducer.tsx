import { IProduct } from "../interfaces/IProduct"
import { 
  SET_PRODUCTS, 
  INCREASE, 
  DECREASE, 
  DELETE_PRODUCT, 
  SET_LOADING, 
  SET_CART_ID,
  CLEAR_CART
} from "../constants/contants"

interface initState {
  cartId: string,
  loading: boolean,
  products: IProduct[]
}

const initProducts: IProduct[] = []

export const initState = {
  cartId: '',
  loading: false,
  products: initProducts
}

const productsReducer = (state: initState, action: any) => {

  switch(action.type) {
    case SET_CART_ID:
      return {
        ...state,
        cartId: action.payload
      }
      break

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
      break

    case INCREASE:
      const newProductsIn = [...state.products]
      newProductsIn.map((item: IProduct) => {
        if(item._id === action.payload) {
          item.quantity = item.quantity + 1
        }
      })
      return {
        ...state,
      }
      break

    case DECREASE:
      const newProductsDe = [...state.products]
      newProductsDe.map((item: IProduct) => {
        if(item._id === action.payload) {
          if(item.quantity > 1) item.quantity = item.quantity - 1
        }
      })
      return {
        ...state,
      }
      break 

    case DELETE_PRODUCT:
      const newProducts = [...state.products]
      newProducts.splice(action.payload, 1)
      return {
        ...state,
        products: newProducts
      }

    case CLEAR_CART:
      action.payload.length = 0
      return {
        ...state,
        products: action.payload
      }

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }

    default:
      throw new Error('Invalid action.')
  }  
}

export default productsReducer

