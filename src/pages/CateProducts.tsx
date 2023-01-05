import React, { useState, useEffect } from 'react'

import { getProductsByCategory } from '../services/product-action';

// Components
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import ListProduct from '../components/List/ListProduct';
import MainLoading from '../components/Loading/MainLoaing';
import Footer from '../components/Footer/Footer';

// Interface
import { IProduct } from '../interfaces/IProduct';

// Router-dom
import { useLocation } from "react-router-dom";

const initProducts: IProduct[] = []

function CateProducts() {
  const location = useLocation();
  const cateName = location.state.cateName
  const cate = location.state.cate
  const [products, setProducts] = useState(initProducts)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getProducts()
  }, [cate])

  const getProducts = async () => {
    if (!!cate) {
      try {
        setLoading(true)
        const data = await getProductsByCategory(cate)
        setProducts(data)
      } catch {
        console.log('error')
      }
      setLoading(false)
    }
  }

  return (
    < >
      <Header />
      <Navbar />
      <div className='container'>
        <div className='product-heading'><h3>{cateName}</h3></div>
        {
          loading ?  <MainLoading /> : <ListProduct products={products} cateName={cateName}/>
        }
      </div>
      <Footer />
    </>
  )
}

export default CateProducts