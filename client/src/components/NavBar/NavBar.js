import React, {useState} from 'react';
import './NavBar.css';

const NavBar = () => {
    // const [toggleLogin, setToggleLogin] = useState(false);
    // const handleLogin = () => setToggleLogin(!toggleLogin);

    return(
        <div className='nav-bar'>
            <span style={{ marginRight: '10px' }}><i className="fa-solid fa-book fa-2xl" style={{color: '#70a7ff'}}></i> </span>
            <span className='text-uppercase fw-7 fs-24'>Tim & Ralph Booksellers</span>
            <span className='login text-uppercase fw-6 fs-16'>Login</span>
            <span className='new-user text-uppercase fw-6 fs-16'>Create</span>
        </div>
    )
}

export default NavBar