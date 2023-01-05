import React, { useContext } from 'react';
import { QueryContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

interface Props {
  inputClass: string
}

function SearchBar(props: Props) {
  const context = useContext(QueryContext)
  const navgate = useNavigate()
  const { inputClass } = props

  const hanleClickSearchBtn = () => {
    navgate('/search-result')
  }

  const hanleKeyDow = (e: any) => {
    if (e.key === 'Enter') {
      navgate('/search-result')
    }
  }
  
  return (
    <div className={`search-bar ${inputClass}`}>
      <button 
        onClick={hanleClickSearchBtn}
        ><i className='fa-solid fa-magnifying-glass'></i>
      </button>
      <input 
        type='search' 
        className='search-input' 
        placeholder='Tìm kiếm' 
        onChange={context?.handleInputChange}
        onKeyDown={hanleKeyDow}
      />
    </div>
  )
}

export default SearchBar