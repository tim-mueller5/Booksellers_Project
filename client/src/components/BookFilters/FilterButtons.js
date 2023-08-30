import React, { useState } from "react";
import FilterBooks from './FilterBooks'

function FilterButtons({ setSearchTerm, searchTerm }){

  const [buttonClicked, setButtonClicked] = useState(null)
  const [filter, setFilter] = useState('')
  const filterArray = ["Featured", "Title", "Author", "Fantasy", "Fiction", "Classics", "Romance", "Non-fiction"]

  const filterButtons = filterArray.map((filter, index) => (
    <button value={filter}
    style={{color: buttonClicked === index ? '#006aff' : 'black', marginRight: '20px',}}
    key={index} onClick={(e) => handleClick(index, e)}>
    {filter}
    </button>))
  
  function handleClick(index, e){
    setFilter(e.target.value);
    setButtonClicked(index === buttonClicked ? null : index);
  }

  return(
      <div className='filter-buttons flex-c text-center'>
          {filterButtons}
          <FilterBooks setSearchTerm={setSearchTerm} searchTerm={searchTerm} filter={filter} />
      </div>
  )
}
export default FilterButtons