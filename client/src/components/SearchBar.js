import React from 'react';

const SearchBar = () => {
    return(
        <div className='search-bar'>
            <input type='text' placeholder="Find Your Books"/>
            <button><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
    )
}

export default SearchBar