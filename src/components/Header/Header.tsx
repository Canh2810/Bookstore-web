import React from 'react';

// Navigate
import { useNavigate } from "react-router-dom";

// Images
import images from '../../assets/images';

// Components
import SearchBar from '../SearchBar/SearchBar';
import AccoutDropdown from '../Dropdown/AccoutDropdown';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const user = JSON.parse(localStorage.getItem('user')!); 
  const navigate = useNavigate()

  const handleClickLogo = () => {
    navigate('/')
  }

  const notify = () => {
    toast.warn('Bạn chưa đăng nhập', {
      position: "top-center",
      autoClose: 3000,
    })
  };

  const handleClickCart = () => {
    if(user) {
      navigate('/my-cart')
    } else {
      notify()
    }
  }

  return (
    <header className='header'>
      <div className='container'>
        <div className='logo'>
          <img src={images.logo} alt='BookStore' onClick={handleClickLogo}/>
        </div>

        <SearchBar inputClass='search-pc'/>

        <div className='icons-group'>
          <div className='shopping-cart'>
            <i className='fa-solid fa-cart-shopping'></i>
            <a href="#" onClick={handleClickCart}>Giỏ hàng</a>
          </div>
          
          <AccoutDropdown />
          <ToastContainer />
        </div>
      </div>
      <SearchBar inputClass='search-mobile'/>
    </header>
  )
}

export default Header