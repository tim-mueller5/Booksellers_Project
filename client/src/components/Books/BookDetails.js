import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetails.css';

const BookDetails = ({ user }) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [book, setBook] = useState({})

    useEffect(() => {
        fetch(`https://example-data.draftbit.com/books/${id}`)
        .then(response => response.json())
        .then(data => setBook(data))       
        .catch(error => {console.error('Error fetching data:', error);});
    }, [id]);

    const handleAddToCart = () =>{
        fetch(`/cart_items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_id": user.id,
                "book_id": book.id,
            }),
        })
        .then(response => console.log(response.json()))
        .then(navigate(`/login`))       
        .catch(error => {console.error('Error fetching data:', error);});
    }
    
    return (
    <div className='book-details'>
    <div className='container'>
        <button className='flex flex-c back-button'
            onClick={()=> navigate(`/`)}>
            <i className="fa-solid fa-circle-left fa-2xl"></i>
        </button>
        <div className='book-details-content grid'>
            <div className='book-details-img'>
                <img src={book?.image_url} alt='cover img' />
            </div>
            <div className='book-details-info'>
                <div className='book-details-title'>
                    <span className='fw-6 fs-26'>{book?.title}</span>
                </div>
                <div className='book-details-authors'>
                    <span className='fw-6 fs-22'>{book?.authors}</span>
                </div>
                <div className='book-details-description'>
                    <span>{book?.description}</span>
                </div>
                <div className='book-details-num-pages'>
                    <span className='fw-6'>Number Of Pages: </span>
                    <span className='text-italic'>{book?.num_pages}</span>
                </div>
                <div className='book-details-rating'>
                    <span className='fw-6'>Rating: </span>
                    <span className='text-italic'>{book?.rating}</span>
                </div>
                <div className='book-details-genres'>
                    <span className='fw-6'>Genres: </span>
                    <span className='text-italic'>{book?.genres}</span>
                </div>
                <button className='cart' onClick={handleAddToCart}>
                    <i className={(user != null) ? "fa-solid fa-cart-shopping fa-2xl" : null}></i>
                </button>
            </div>
        </div>
    </div>
    </div>
    )
}
export default BookDetails