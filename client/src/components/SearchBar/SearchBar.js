import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
    return(
        <div className='search'>
            <input className = 'search-bar' type='text' placeholder="Search"/>
            <button className='search-button flex-c'>
                <i className="fa-solid fa-magnifying-glass fa-xl" type='submit'></i>
            </button>
        </div>
    )
}

export default SearchBar