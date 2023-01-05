import React from 'react'

import { IProduct } from '../../interfaces/IProduct'

// Navigation
import { useNavigate } from 'react-router-dom';

// Carousel library
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Reponsive slide
import { responsive } from '../../helper/helper';

interface Props {
  products: IProduct[]
}

function ProductSlide(props: Props) {
  const navigate = useNavigate()
  const { products } = props

  return (
    <div className='sale-product'>
      <h2 className='sale-product-heading'><i className='fa-solid fa-bolt'></i>FLASH SALE</h2>
      <Carousel responsive={responsive}>
        {
          products.map((product: IProduct) => (
            <div className='sale-product-item' 
              key={product._id} 
              onClick={() => {
                navigate(`/product/${product._id}`, {state: { product: product}})
              }} >
              <div className='sale-product-img'>
                <img src={product.image} alt={product.name}/>
              </div>
              <div className='sale-product-info'>
                <div className='overlay'></div>
                <p className='sale-product-name'>{product.name}</p>
                <p className='sale-product-author'>{product.author}</p>
                <div className='sale-product-price'>
                  <p className='sale-product-oldprice'>
                    {product.oldPrice.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
                  </p>
                  <p className='sale-product-newprice'>
                    {product.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
                  </p>
                </div>
              </div>
              <div className='sale-product-discount'>{product.discount} %</div>
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

export default ProductSlide