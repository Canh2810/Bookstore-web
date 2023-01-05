import React, {useState} from 'react'

// Navigate
import { useNavigate } from 'react-router-dom';

import { catList } from '../../constants/list';

function Navbar() {
  const navigate = useNavigate()
  const [display, setDisplay] = useState('nav-hide')

  const handleOpenNav = () => {
    setDisplay('nav-show')
  }

  const handleCloseNav = () => {
    setDisplay('nav-hide')
  }

  return (
    <div className='navbar'>
      <div className='container'>
        <div className='nav-action'>
          <button className='nav-btn' onClick={handleOpenNav}>
            <i className='fa-solid fa-bars'></i> Menu
          </button>
        </div>
        <div className={`nav-overlay ${display}`}></div>
        <ul className={`nav-list ${display}`}>
          <button className='close-nav-btn' onClick={handleCloseNav}>
            <i className='fa-solid fa-xmark'></i>
          </button>
          {catList.map((item: {cateName: string, cate: string}) => 
            <li className='nav-item' key={item.cateName}
            onClick={() => 
              {navigate('/cate-product', {state: {
                cateName: item.cateName,
                cate: item.cate
              }})}
            }
          ><i className='fa fa-book' aria-hidden='true'></i>{item.cateName}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar