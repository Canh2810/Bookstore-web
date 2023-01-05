import React, { useState } from 'react';

// Navigate
import { useNavigate } from "react-router-dom";

// Services
import { login } from '../../services/auth-action';

// Components
import MainLoading from '../Loading/MainLoaing';

const initUserValue = {
  'username': '',
  'password': ''
}

function LoginForm() {
  const navigate = useNavigate()
  const [user, setUser] = useState(initUserValue)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleValueChange = (key: string, value: string) => {
    setUser({...user, [key]: value})
  }

  const handleLogin = async () => {
    if(!user.username || !user.password) {
      setMessage('Vui lòng điền tất cả các trường')
    } else {
      setLoading(true)
      setMessage('')
      try {
        const res: any = await login(user)
        navigate('/')
        localStorage.setItem('user', JSON.stringify(res.user));
      } catch {
        setMessage('Tài khoản hoặc mật khẩu không chính xác')
      }
      setLoading(false)
    }
  }

  const handleClickHome = () => {
    navigate('/')
  }

  const handleClickRegister = () => {
    navigate('/register')
  }

  return (
    <div className='login-form'>
        <h3 className='login-form-heading'>Đăng Nhập</h3>
        <input type='text' placeholder='Tài khoản' name='username'
          onChange={(e) => handleValueChange(e.target.name, e.target.value)}
        />
        <input type='password' placeholder='Mật khẩu' name='password'
          onChange={(e) => handleValueChange(e.target.name, e.target.value)}
        />
        <button className='btn' onClick={handleLogin}>Đăng nhập</button>
        <div className='login-form-bottom'>
          <a href="" onClick={handleClickHome}>Trang chủ</a>
          <a href="" onClick={handleClickRegister}>Đăng ký</a>
        </div>
        {loading && <MainLoading />}
        <p className='auth-message'>{message}</p>
      </div>
  )
}

export default LoginForm