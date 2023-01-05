import axios from "axios";

import { ORDER_API, USER_ORDER } from "../constants/api";

const createOrder = async (values: any): Promise<any> => {
  const res = await axios.post(ORDER_API, values);
  return res.data
}

const getOrder = async (userId: string): Promise<any> => {
  const res = await axios.get(USER_ORDER + `${userId}`);
  return res.data.order
}

export { createOrder, getOrder }