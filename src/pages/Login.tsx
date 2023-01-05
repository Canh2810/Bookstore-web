import React from 'react';

//Components
import LoginForm from '../components/Form/LoginForm';

// Images
import images from '../assets/images';

function Login() {
  
  return (
    <div className='login'>
      <div className='login-left'>
        <img src={images.logo} alt="" />
      </div>
      <div className='login-right'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login