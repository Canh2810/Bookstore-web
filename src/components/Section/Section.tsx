import React, { useState, useEffect } from 'react';

// Services
import { getAllProduct, getTrendingProduct } from '../../services/product-action';

// Interfaces
import { IProduct } from '../../interfaces/IProduct';

// Component
import ProductSlide from '../Slide/ProductSlide';
import ProductAside from '../Aside/ProductAside';
import MainLoading from '../Loading/MainLoaing';

// Navigation
import { useNavigate } from 'react-router-dom';


const initProducts: IProduct[] = []

function Section() {
  const [newProducts, setNewProducts] = useState(initProducts)
  const [saleProducts, setSaleProduct] = useState(initProducts)
  const [trendingProducts, setTrendingProduct] = useState(initProducts)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getProductsDetails()
    getTrendingProductDetails()
  }, [])

  // Get new products
  const getProductsDetails = async () => {
    try {
      setLoading(true)
      const data = await getAllProduct()
      const newProducts = []
      for(let i=0; i<9; i++) {
        newProducts.push(data[i])
      }
      setNewProducts(newProducts)
      const saleProduct = [] as any
      data.map((product: IProduct) => {
        if(product.discount < -45) saleProduct.push(product)
      })
      setSaleProduct(saleProduct)
      setLoading(false)
    } catch {
      console.log('error')
    }
  }

  const getTrendingProductDetails = async () => {
    try {
      const data = await getTrendingProduct()
      setTrendingProduct(data)
    } catch {
      console.log('Error when call trending product')
    }
  }
  
  return (
    <section className='container home-content'>
      { loading && <MainLoading />}
      <ProductSlide products={saleProducts}/>
      <div className='home-main'>
        <div className='new-product'>
          <div className='new-product-heading'>
            <h2>Sách mới</h2>
          </div>
          <div className='new-product-list'>
            {newProducts.map((product: IProduct) => (
              <div 
                key={product._id} 
                className = 'new-product-item'
                onClick={() => {
                  navigate(`/product/${product._id}`, {state: { product: product}})
                }}
              >
                <div className='new-product-img'>
                  <img src={product.image} alt={product.name} />
                </div>
                <div className='new-product-info'>
                  <p className='new-product-name'>{product.name}</p>
                  <p className='new-product-author'>{product.author}</p>
                  <p className='new-product-price'>{product.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ProductAside products={trendingProducts}/>
      </div>
    </section>
  )
}

export default Section