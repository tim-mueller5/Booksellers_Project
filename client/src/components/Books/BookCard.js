import React from 'react';
import { Link } from 'react-router-dom';
import './BookList.css'

function BookCard ({book}){

    return(
        <div className='book-card flex flex-c flex-column flex-sb'>
            <div className='book-card-img'>
                <img src = {book.image_url} alt = 'cover'/>
            </div>
            <div className='book-card-info text center'>
                {/* <Link to = {`https://example-data.draftbit.com/books/${book.id}`}></Link> */}
                <div className='book-card-title fw-7 fs-18'>
                    <span>{book.title}</span>
                </div>
                <div className='book-card-author fs-15'>
                    <span className='text-capitalize fw-7'>Author: </span>
                    <span>{book.authors}</span>
                </div>
                <div className='book-card-rating fs-15'>
                    <span className='text-capitalize fw-7'>Rating: </span>
                    <span>{book.rating}</span>
                </div>
            </div>
        </div>
    )
}

export default BookCard