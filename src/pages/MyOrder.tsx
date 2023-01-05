import React, { useState, useEffect } from 'react';

// Components
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Service
import { getOrder } from '../services/order-action';

const WAITING = 'Chờ Xác Nhận'
const SHIPPING = 'Đang Giao'
const DELIVERED = 'Đã Giao'

const tabs = [WAITING, SHIPPING, DELIVERED]

function MyOrder() {
  const user = JSON.parse(localStorage.getItem('user')!)
  const [type, setType] = useState(WAITING)
  const [status, setStatus] = useState('waiting')
  const [order, setOrder] = useState([])

  useEffect(() => {
    getOrderDetails()
  }, [status])

  const getOrderDetails = async () => {
    const res = await getOrder(user._id)
    setOrder(res)
    const orderArr = [] as any
    res.map((item: any) => {
      item.status === status ? orderArr.push(item) : {} as any
    })
    setOrder(orderArr)
  }

  const handleClickBtn = (type: string) => {
    setType(type)

    switch(type) {
      case WAITING: setStatus('waiting')
      break
      case SHIPPING: setStatus('shipping')
      break
      case DELIVERED: setStatus('delivered')
      break
    }
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className=' container my-order'>
        <div className='btn-group'>
          {
            tabs.map((tab: string) => (
              <button 
                className={`my-order-btn ${type === tab ? 'active' : ''}`}
                key={tab} 
                onClick={() => handleClickBtn(tab)}>{tab}</button>
            ))
          }
        </div>
        <div className='my-order-list'>
          {
            order.map((item: any) => (
              <div className='my-order-item' key={item._id}>
                <p key={item._id}>Mã đơn hàng: <span className='my-order-id'>{item._id}</span></p>
                <div className='my-order-product'>
                  <p className='my-product-heading'>Sản phẩm: </p>
                  {
                    item.products.map((product: any) => (
                      <p key={product._id} className='my-product-info'>{product.productName}: {product.quantity}</p>
                    ))
                  }
                </div>
                <p>Tổng giá: <span className='my-order-price'>
                  {item.totalPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
                  </span>
                </p>
                <div className='my-order-info'>
                  <p className='my-order-username'>Người nhận: {item.userName}</p>
                  <p className='my-order-userphone'>SDT: {item.phone}</p>
                  <p className='my-order-address'>Vận chuyển đến: {item.address}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyOrder