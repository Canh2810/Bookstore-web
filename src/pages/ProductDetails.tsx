import React, { useState, useEffect } from 'react'

// Components
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Router-dom
import { useLocation } from 'react-router-dom'

// Helper
import changeCategory from '../helper/helper'

// Services
import { getCart, updateCart } from '../services/cart-action'

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const location = useLocation()
  const product = location.state.product
  const [count, setCount] = useState(1)
  const [cartId, setCartId] = useState('')
  
  const productData =
    {
      productId: product._id,
      productImg: product.image,
      productName: product.name,
      productPrice: product.price,
      productDiscount: product.discount,
      quantity: 1
    }

  const category = changeCategory(product.category)

  const user = JSON.parse(localStorage.getItem('user')!); 

  const handleInputValueChange = (e:any) => {
    if(e.target.value) {
      const value = parseInt(e.target.value)
      setCount(value)
      productData.quantity = value
    }
  }

  const handleIncrease = () => {
    if(count >= 1) {
      setCount(count+1)
    }
  }

  const handleReduce = () => {
    if(count > 1) {
      setCount(count-1)
    }
  }

  useEffect(() => {
    getCartDetails()
  }, [])

  const getCartDetails = async () => {
    if(user) {
      const res = await getCart(user._id)
      setCartId(res._id)
    }
  }
  
  const notify = (message: string) => {
    toast(message, {
      position: "top-center",
      autoClose: 3000,
    })
  };

  const handleAddToCart = async () => {
    const cartProductArr = [] as any
    productData.quantity = count
    if(user) {
      try {
        const cartInfo = await getCart(user._id)
        cartInfo.products.map((product: any) => {
        cartProductArr.push(product)
        })
        cartProductArr.push(productData)
      } catch {
        console.log('Error when call Get Cart API')
      }
      try {
        await updateCart(cartId, cartProductArr)
        notify('Đã thêm sản phẩm vào giỏ hàng')
      } catch {
        notify('Thêm vào giỏ hàng thất bại, xin hãy thử lại')
        console.log('Error when call Update Cart API')
      }
    } else {
      notify('Bạn cần đăng nhập trước khi thêm sản phẩm')
    }
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className='container'>
        <h3 className='product-details-heading'>Chi Tiết Sản Phẩm</h3>
        <div className='product-details'>
          <div className='products-details-main'>
            <div className='product-details-img'>
              <img src={product.image} alt={product.name} />
            </div>

            <div className='product-details-info'>
              <p className='product-info-price'>
                {product.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
              </p>
              <p className='product-info-name'>{product.name}</p>
              <p className='product-info-author'>Tác Giả: {product.author}</p>
              <p className='product-info-cate'>Thể Loại: {category}</p>
              <div className='product-info-group'>
                <div className='info-group-item'>
                  <p className='info-group-title'>Năm Xuất Bản</p>
                  <p className='info-group-text'>{product.namXB}</p>
                </div>
                <div className='info-group-item'>
                  <p className='info-group-title'>Nhà Xuất Bản</p>
                  <p className='info-group-text'>{product.nhaXB}</p>
                </div>
                <div className='info-group-item'>
                  <p className='info-group-title'>Số Trang</p>
                  <p className='info-group-text'>{product.soTrang}</p>
                </div>
                <div className='info-group-item'>
                  <p className='info-group-title'>Điểm</p>
                  <p className='info-group-text'>{product.rating}</p>
                </div>   
              </div>
              <div className='product-info-des'>
                <p className='info-des-title'>Mô tả</p>
                <p className='info-des-text'>{product.description}</p>
              </div>
            </div>
          </div>

            <div className='cart-action'>
              <div className='increase-reduce-action'>
                <button className='cart-action-reduce' onClick={handleReduce}>
                  <i className='fa fa-minus' aria-hidden='true'></i>
                </button>
                <input type='number' value={count} name='amount' onChange={handleInputValueChange}/>
                <button className='cart-action-increase' onClick={handleIncrease}>
                  <i className='fa fa-plus' aria-hidden='true'></i>
                </button>
              </div>
              <button className='btn add-cart-btn' onClick={handleAddToCart}>Thêm Vào Giỏ Hàng</button>
            </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default ProductDetails