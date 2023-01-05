import React from 'react';

// Css
import './assets/styles/index.css'

// Pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CateProducts from './pages/CateProducts';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrder from './pages/MyOrder';
import SearchResult from './pages/SearchResult';

// Route
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cate-product' element={<CateProducts />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/my-cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/my-order' element={<MyOrder />} />
          <Route path='/search-result' element={<SearchResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
