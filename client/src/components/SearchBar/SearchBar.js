import React from "react";
import './SearchBar.css';

const SearchBar = ({searchTerm, setSearchTerm}) => {
    return(
        <div className='search'>
            <input className = 'search-bar' type='text' placeholder="Search"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button className='search-button flex-c'>
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </button>
        </div>
    )
}
export default SearchBar