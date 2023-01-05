import axios from 'axios';

// Api
import { USER_LOGIN, USER_REGISTER, CART_API } from '../constants/api';

// Interfaces
import { IUser } from '../interfaces/IUser';
import { IProduct } from '../interfaces/IProduct';

const register = async (data: IUser): Promise<IUser> => {
  const res = await axios.post(USER_REGISTER, data);
  const userId = res.data.user._id;
  const products: IProduct[] = [] 
  if(res.data.success) {
    await axios.post(CART_API, {userId, products})
  }
  return res.data
}

const login =  async (data: IUser): Promise<IUser> => {
  const res = await axios.post(USER_LOGIN, data);
  return res.data
}

export { register, login }