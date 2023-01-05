import React from 'react';

// Components
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Router-dom
import { useLocation } from 'react-router-dom';

// Service
import { createOrder } from '../services/order-action';
import { updateCart } from '../services/cart-action';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Navigate
import { useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation()
  const user = location.state.newOrder
  const products = location.state.newOrder.products
  const totalPrice = location.state.newOrder.totalPrice
  const cartId = location.state.cartId
  const navigate = useNavigate()

  const notify = (message: string) => {
    toast(message, {
      position: "top-center",
      autoClose: 3000,
    })
  };
  
  const handleSubmitCheckout =  async() => {
    try {
      const clearProduct = [] as any
      await createOrder(location.state.newOrder)
      notify('Đặt hàng thành công')
      await updateCart(cartId, clearProduct)
      navigate('/my-order')
    } catch {
      console.log('Error when call Update Cart API')
      notify('Lỗi hệ thống, đặt hàng thất bại')
    }
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className='checkout container'>
        <h2 className='checkout-heading'>Xác nhận đặt hàng</h2>
        <div className='checkout-main'>
          <ul className='checkout-product-list'>
            {
              products.map((product: any) => (
                <li className='checkout-product-item' key={product._id}>
                  <img src={product.productImg} alt='Hình sản phẩm' className='checkout-product-img'/>
                  <div className='checkout-product-info'>
                    <p className='checkout-product-name'>{product.productName}</p>
                    <p className='checkout-product-qty'>Số lượng: {product.quantity}</p>
                    <p className='checkout-product-price'>
                      {(product.productPrice * product.quantity).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
                    </p>
                  </div>
                </li>
              ))
            }
          </ul>
          <div className='checkout-procedure'>
            <p className='checkout-total-price'>
              Tổng thanh toán: {totalPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
            </p>
            <div className='checkout-user'>
              <p className='checkout-user-heading'>Thông tin đặt hàng</p>
              <p className='checkout-user-name'>{user.name}</p>
              <p className='checkout-user-address'>Địa chỉ nhận hàng: {user.address}</p>
              <p className='checkout-user-phone'>Số điện thoại: {user.phone}</p>
              <p className='checkout-user-payment'>Phương thức thanh toán: Than toán khi nhận hàng</p>
            </div>
            <div className='checkout-procedure-action'>
              <button className='btn checkout-btn' onClick={handleSubmitCheckout}> Xác Nhận Đặt hàng</button>
              <button className='btn'>Hủy đơn hàng</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default Checkout