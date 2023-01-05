import React, { useState, useEffect } from 'react';

// Navigate
import { useNavigate } from "react-router-dom";

const initUserValue = {
  'username': '',
  'name': '',
  'password': '',
  'phone': '',
  'address': ''
}

function AccoutDropdown() {
  const navigate = useNavigate()
  const [user, setUser] = useState(initUserValue)

  const handleClickLogin = () => {
    navigate('/login')
  }

  const handleClickLogout = () => {
    navigate('/login')
    localStorage.clear()
  }

  const hanleClickOrder = () => {
    navigate('/my-order')
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <div className='accout'>
      <div className='accout-dropdown' onClick={handleClickLogin}>
        <i className='fa-solid fa-user'></i>
        { !user.name && <a href="">Đăng nhập</a> }
        { user.name && <p>{user.name}</p> }
      </div>
      { 
        user.name && 
        <div className='accout-dropdown-content'>
          <a href="#">Tài khoản</a>
          <a href="" onClick={hanleClickOrder}>Đơn mua</a>
          <a href="" onClick={handleClickLogout}>Đăng xuất</a>
        </div>
      }
    </div>
  )
}

export default AccoutDropdown