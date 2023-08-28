import React, {useState} from 'react';
import { Link } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
    // const [toggleLogin, setToggleLogin] = useState(false);
    // const handleLogin = () => setToggleLogin(!toggleLogin);

    return(
        <div className='nav-bar'>
            <span style={{ marginRight: '10px' }}><i className="fa-solid fa-book fa-2xl" style={{color: '#70a7ff'}}></i> </span>
            <Link to="/" className='text-uppercase fw-7 fs-24'>Tim & Ralph Booksellers</Link>
            <Link to="/login" className='login text-uppercase fw-6 fs-16'>Login</Link>
            <Link to="/create" className='new-user text-uppercase fw-6 fs-16'>Create</Link>
        </div>
    )
}

export default NavBar