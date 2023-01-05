import React, { useState } from 'react';

// Services
import { register } from '../../services/auth-action';

// Navigate
import { useNavigate } from "react-router-dom";

// Components
import MainLoading from '../Loading/MainLoaing';

const initUserValue = {
  'username': '',
  'name': '',
  'password': '',
  'phone': '',
  'address': ''
}

function RegisterForm() {
  const navigate = useNavigate()
  const [user, setUser] = useState(initUserValue)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleValueChange = (key: string, value: string) => {
    setUser({...user, [key]: value})
  }

  const handleRegister = async () => {
    if(!user.username || !user.name || !user.password || !user.phone || !user.address) {
      setMessage('Vui lòng điền tất cả các trường')
    } else {
      setLoading(true)
      setMessage('')
      try {
        const res: any = await register(user)
        navigate('/')
        localStorage.setItem('user', JSON.stringify(res.user));
      } catch {
        setMessage('Đăng ký không thành công')
      }
      setLoading(false)
      }
  }

  const handleClickHome = () => {
    navigate('/')
  }

  const handleClickLogin = () => {
    navigate('/login')
  }

  return (
    <div className='register-form'>
      <h3 className='register-form-heading'>Đăng Ký</h3>
      <input type='text' placeholder='Tên đăng nhập' name='username'
        onChange={(e) => handleValueChange(e.target.name, e.target.value)}
      />
      <input type='text' placeholder='Họ tên' name='name'
        onChange={(e) => handleValueChange(e.target.name, e.target.value)}
      />
      <input type='password' placeholder='Mật khẩu' name='password'
        onChange={(e) => handleValueChange(e.target.name, e.target.value)}
      />
      <input type='number' placeholder='Số điện thoại' name='phone'
        onChange={(e) => handleValueChange(e.target.name, e.target.value)}
      />
      <input type='text' placeholder='Địa chỉ' name='address'
        onChange={(e) => handleValueChange(e.target.name, e.target.value)}
      />
      <button className='btn' onClick={handleRegister}>Đăng ký</button>
      <div className='register-form-bottom'>
        <a href="" onClick={handleClickHome}>Trang chủ</a>
        <a href="" onClick={handleClickLogin}>Đăng nhập</a>
      </div>
      {loading && <MainLoading />}
      <p className='auth-message'>{message}</p>
    </div>
  )
}

export default RegisterForm