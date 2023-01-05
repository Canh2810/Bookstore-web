import React, { useState, createContext, useEffect } from 'react';

// Service
import { getAllProduct } from '../services/product-action';

// Interface
import { IProduct } from '../interfaces/IProduct';

interface AppContextInterface {
  query: string,
  handleInputChange: (e: any) => void,
  products: IProduct[]
}

const initProducts: IProduct[] = []

const QueryContext = createContext<AppContextInterface | null>(null)

function Provider({ children }: any) {
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState(initProducts)

  const handleInputChange = (e: any) => {
    setQuery(e.target.value)
  }

  useEffect(() => {
    getAllProductsDetails()
  }, [])

  const getAllProductsDetails = async () => {
    try {
      const data = await getAllProduct()
      setProducts(data)
    } catch {
      console.log('error when call all product API')
    }
  }

  const value = {
    query,
    handleInputChange,
    products
  }

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  )
}

export { QueryContext, Provider }