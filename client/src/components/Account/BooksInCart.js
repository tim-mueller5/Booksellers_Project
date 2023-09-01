import React from "react";
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';

function BooksInCart ({ book }){
    const navigate = useNavigate();

    // const handleDelete = () => {
    //     fetch(`/cart_items/${book.cart_items.user_id.id}`, {
    //         method: "DELETE",
    //     }).then(() => setUser(null) )
    //     .then(navigate(`/login`))
    // }r
    console.log(book.cart_items.user_id)
    console.log(book)
    return(    
        <div className='cart-card flex flex-c flex-column flex-sb'>
        <div className='cart-card-img'>
            <button className='delete-button'
                onClick={()=> navigate(`/`)}>
            <i class="fa-solid fa-xmark fa-lg"></i>
        </button>
            <img value={book.id} src ={book.image_url} alt='cover'/>
        </div>
        <div className='cart-card-info text center'>
            <div className='book-card-title fw-7'>
                <span>{book.title}</span>
            </div>
            <div className='cart-card-author'>
                <span className='text-capitalize fw-7'>Author: </span>
                <span>{book.authors}</span>
            </div>
        </div>
    </div>
    )
}
export default BooksInCart