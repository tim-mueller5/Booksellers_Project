import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';
import './Header.css';

const Header = () =>{
    return(
        <header className='header'>
            <NavBar />
            <div className='header-content flex flex-c text-center text-white'>
                <h2 className='header-title'> Uncover Your Next Book.</h2>
                <br />
                <p className='header-text fs-19 fw-3'>
                Discover a world of knowledge and imagination, where you can explore a diverse collection of books, 
                uncover hidden literary gems, and embark on journeys through pages
                </p>
                <SearchBar />
            </div>
        </header>
    )
}

export default Header