import React from "react";
import BookCard from './BookCard'
import './BookList.css';

function BookList({ books }) {
  const book = books.map((book, index) =>  {
    return(<BookCard key={index} book={book} />)})
  
  return (
    <div className='book-list'>
      <div className='container'>
        <div className='section-title'>
        </div>
        <div className='book-list-content grid'>
          {book}
        </div>
      </div>
    </div>
  );
}
export default BookList