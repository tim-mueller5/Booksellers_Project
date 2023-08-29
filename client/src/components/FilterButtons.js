import React, { useEffect, useState } from "react";
import BookList from './Books/BookList'
import FilterBooks from './FilterBooks'

function FilterButtons(){

  const [buttonClicked, setButtonClicked] = useState(null)
  const [filter, setfilter] = useState('')
  const filterArray = ["Featured", "Title", "Author", "Fantasy", "Fiction", "Non-fiction"]

  const filterButtons = filterArray.map((filter, index) => (
    <button value={filter}
    style={{
    color: buttonClicked === index ? '#006aff' : 'black', marginRight: '20px',}}
    key={index} onClick={(e) => handleClick(index, e)}>
    {filter}
    {/* {buttonClicked === '#006aff' ? displayBooks : null} */}
  </button>))
  
  function handleClick(index, e){
    setfilter(e.target.value);
    setButtonClicked(index === buttonClicked ? null : index);
}

    return(
        <div className='filter-buttons flex-c text-center'>
            {filterButtons}
            <FilterBooks filter={filter}/>
        </div>
    )
}

export default FilterButtons