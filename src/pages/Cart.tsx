import React, { useState, useEffect, useReducer } from 'react';

// Components
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import MainLoading from '../components/Loading/MainLoaing';
import Footer from '../components/Footer/Footer';

// Service
import { getCart, updateCart } from '../services/cart-action';

// Reducer
import productsReducer, {initState} from '../store/reducer';

// Action
import { 
  setProducts, 
  increase, 
  decrease, 
  deleteProduct, 
  setLoading, 
  setCartId, 
  clearCart 
} from '../store/action';

// Navigate
import { useNavigate } from "react-router-dom";

function Cart() {
  const user = JSON.parse(localStorage.getItem('user')!)
  const [state, dispatch] = useReducer(productsReducer, initState)
  const { products, loading, cartId } = state
  const navigate = useNavigate()

  useEffect(() => {
    getCartByUserId()
  }, [])

  const getCartByUserId = async () => {
    dispatch(setLoading(true))
    const res = await getCart(user._id)
    dispatch(setProducts(res.products))
    dispatch(setCartId(res._id))
    dispatch(setLoading(false))
  } 

  const handleIncrease = (id: string) => {
    dispatch(increase(id))
  }

  const handleDecrease = (id: string) => {
    dispatch(decrease(id))
  }

  const handleRemoveProduct = (index: number) => {
    dispatch(deleteProduct(index))
  }

  const totalPrice = products.reduce((summedPrice: any, product: any) => 
  summedPrice + product.productPrice * product.quantity, 0);
  const amount = products.reduce((amount: number, product: any) => amount + product.quantity, 0);

  const newOrder = {
    userId: user._id,
    userName: user.name,
    address: user.address,
    phone: user.phone,
    products: products,
    totalPrice: totalPrice,
    amount: amount
  }

  const handleOrder = async() => {
    try {
    } catch {
      console.log('Error when call Update Cart API')
    }
    navigate('/checkout', { state: {newOrder: newOrder, cartId: cartId}})
  }

  return (
    <>
    <Header />
    <Navbar />
    <div className='container cart-products'>
      <h2 className='cart-heading'>GIỎ HÀNG CỦA TÔI</h2>
      { loading && <MainLoading />}
      <ul className='cart-products-list'>
        {
          products.map((product: any, index: number) => (
            <li className='cart-product-item' key={product._id}>
              <div className='cart-product-details'>
                <img src={product.productImg} alt='Hình sản phẩm' />
                <div className='cart-product-info'>
                  <p className='cart-product-name'>{product.productName}</p>
                  <div className='increase-reduce-action'>
                    <button className='cart-action-reduce' onClick={() => handleDecrease(product._id)}>
                      <i className='fa fa-minus' aria-hidden='true'></i>
                    </button>
                    <input type='number' value={product.quantity} onChange={() => {}}/>
                    <button className='cart-action-increase' onClick={() => handleIncrease(product._id)}>
                      <i className='fa fa-plus' aria-hidden='true'></i>
                    </button>
                  </div>
                  <p className='cart-product-price'>{
                    (product.productPrice * product.quantity).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  } đ</p>
                </div>
              </div>
              <button className='delete-product-btn' onClick={() => handleRemoveProduct(index)}><i className='fa fa-times' aria-hidden="true"></i></button>
            </li>
          ))
        }
      </ul>
      <div className='oder'>
        <p className='cart-total-price'>Tổng tiền: {totalPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</p>
        <button className='btn' onClick={handleOrder}>Đặt hàng</button>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Cart