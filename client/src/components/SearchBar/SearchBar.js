import React, { createContext, useContext, useState } from "react";
import './SearchBar.css';

// const GlobalContext = createContext();

const SearchBar = () => {
    const [input, setInput] = useState('');
    
    function handleSubmit(value){
        setInput(value)
    }

    return(
        <div className='search'>
            <input className = 'search-bar' type='text' placeholder="Search"
                value={input} onChange={(e) => handleSubmit(e.target.value)}/>
            <button className='search-button flex-c' onClick={() => handleSubmit(input)}>
                <i className="fa-solid fa-magnifying-glass fa-xl"></i>
            </button>
        </div>
    )
}

export default SearchBar