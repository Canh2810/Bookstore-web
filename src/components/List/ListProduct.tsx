import React, { useContext, useState} from 'react';

import { IProduct } from '../../interfaces/IProduct';

import { useNavigate } from 'react-router-dom';

import ReactPaginate from 'react-paginate';

interface Props {
  products: IProduct[],
  cateName?: string;
}

function ListProduct(props: Props) {
  const { products, cateName } = props
  const navigate = useNavigate()

  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
 
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className='product-list'>
        { currentItems
        // .filter((product: IProduct) => product.name.toLowerCase().includes(''))
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
                <p className='product-cate'>Thể loại: {cateName}</p>
                <p className='product-price'>{product.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ</p>
              </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='< previous'
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='page-num-active'
      />
    </>
  );

}

export default ListProduct