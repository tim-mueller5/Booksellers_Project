import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';

import BooksInCart from './BooksInCart.js'
import './AccountDetails.css';

function AccountDetails({ user, setUser }) {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([])

    const formSchema = yup.object().shape({
        username: yup.string(),
        password: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/users/${user.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((response) => {
                if (response.ok) {
                    response.json().then((user) => setUser(user));
                  }
            }).then(navigate(`/`))
            alert("Account Details Changed")
        }
    })

    const handleDelete = () =>{
        fetch(`/users/${user.id}`, {
            method: "DELETE",
        }).then(() => {
            setUser(null);
            (navigate(`/`));
            alert("Account Deleted");
        })
    }
    
    const handleLogOut = () => {
        fetch("/logout", {
            method: "DELETE",
        }).then(() => setUser(null) )
        .then(navigate(`/`))
    }

    useEffect(() => {
        fetch(`/cart_items/${user.id}`)
        .then(response => response.json())
        .then(data => {setCartItems(data)})
        .catch(error => {console.error('Error fetching data:', error)});
        
    }, []);
    console.log(cartItems)
    const displayCartItems = cartItems.map((item, index) =>  {
        return(<BooksInCart key={index} book={item.book} itemId={item.id} />)})

    return (
        <div>   
        <h1 className='container flex-c text-center'>Account Details</h1>
            <div className='account-details text-center'>
                <form onSubmit={formik.handleSubmit}>
                    <h3>Username Information</h3>
                        <span className='text-italic'>Current Username:&nbsp;&nbsp;{user.username}</span>
                        <br />
                        <button className='btn-red' onClick={handleDelete}
                            >Delete User</button>
                        <br />
                        <span className='new-username'>New Username: </span>
                        <input name="username" value={formik.values.username}
                            onChange={formik.handleChange}
                            style={{color: '#70a7ff'}} />
                        <p style={{ color: "red" }}> {formik.errors.username}</p>
                        <button className='btn-save' type="submit">Save</button>
                        
                    <h3>Password Information</h3>
                        <span className='new-password'>New Password: </span>
                        <input name="password" value={formik.values.password}
                            onChange={formik.handleChange}
                            style={{color: '#70a7ff'}} />
                        <p style={{ color: "red" }}> {formik.errors.password}</p>
                        <button className='btn-save' type="submit">Save</button>
                </form>    
                <h3>In Cart:</h3>
                        <div className='cart-list'>
                            <div className='cart-container'>
                                <div className='cart-list-content grid'>
                                    {displayCartItems}
                                </div>
                            </div>
                        </div>
                    <button className='btn-red' onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    )
}
export default AccountDetails;