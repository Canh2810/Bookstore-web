import React, { useContext} from 'react';

// Components
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import { QueryContext } from '../store/Context';

// Interfaces
import { IProduct } from '../interfaces/IProduct';

// Router-dom
import { useNavigate } from 'react-router-dom';

function SearchResult() {
  const navigate = useNavigate()
  const context = useContext(QueryContext)
  const products = context?.products
  const query = context?.query.toLowerCase()
  
  return (
    <>
      <Header />
      <Navbar />
      <div className=' container search-result'>
        <div className='product-list'>
          { query && products?.filter((product: IProduct) => product.name.toLowerCase().includes(query? query: ''))
          .map((product: IProduct) => (
            <div 
                key={product._id} 
                className = 'product-item'
                onClick={() => {
                  navigate(`/product/${product._id}`, {state: { product: product}})
                }}
                >
                <div className='product-img'>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className='product-info'>
                  <p className='product-name'>{product.name}</p>
                  <p className='product-author'>Tác giả: {product.author}</p>
                  <p className='product-price'>{product.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</p>
                </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SearchResult