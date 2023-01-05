import React from 'react';

// Components
import RegisterForm from '../components/Form/RegisterForm';

// Images
import images from '../assets/images';

function Register() {
  return (
    <div className='register'>
      <div className='register-left'>
        <img src={images.logo} alt="" />
      </div>
      <div className='register-right'>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register