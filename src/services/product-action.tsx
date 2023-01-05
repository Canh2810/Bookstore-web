import axios from 'axios';

// Api
import { ALL_PRODUCT_API_URL, PRODUCT_BY_CATEGORY_URL, TRENDING_PRODUCT_API_URL } from '../constants/api';

// Interfaces
import { IProduct } from '../interfaces/IProduct';

const getAllProduct = async (): Promise<IProduct[]> => {
  const res =  await axios.get(ALL_PRODUCT_API_URL); 
  return res.data.products
}

const getProductsByCategory = async (cate: string): Promise<IProduct[]> => {
  const res = await axios.get(PRODUCT_BY_CATEGORY_URL + `${cate}`);
  return res.data.products
}

const getTrendingProduct = async (): Promise<IProduct[]> => {
  const res =  await axios.get(TRENDING_PRODUCT_API_URL); 
  return res.data.products
}

export { getAllProduct, getProductsByCategory, getTrendingProduct }