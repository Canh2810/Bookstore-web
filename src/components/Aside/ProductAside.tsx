import React, { useState, useEffect } from 'react'

// Action
import { getTrendingProduct } from '../../services/product-action'

// Interface
import { IProduct } from '../../interfaces/IProduct'

// Navigation
import { useNavigate } from 'react-router-dom'

interface Props {
  products: IProduct[]
}

function ProductAside(props: Props) {
  const {products} = props
  const navigate = useNavigate()
  
  return (
    <aside className='trending-product'>
      <h2 className='trending-product-heading'>Sách Phố Biến</h2>
      <div className='trending-product-main'>
        {
            products.map((product: IProduct) => (
              <div className='trending-product-item' 
                key={product._id} 
                onClick={() => {
                  navigate(`/product/${product._id}`, {state: { product: product}})
                }} >
                <div className='trending-product-img'>
                  <img src={product.image} alt={product.name}/>
                </div>
                <div className='trending-product-info'>
                  <p className='trending-product-name'>{product.name}</p>
                  <p className='trending-product-author'>{product.author}</p>
                  <p className='trending-product-price'>
                    {product.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ
                  </p>
                </div>
              </div>
            ))
          }
      </div>
    </aside>
  )
}

export default ProductAside