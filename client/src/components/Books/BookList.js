import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import BookCard from './BookCard'
import FilterBooks from '../FilterBooks.js'
import './BookList.css';

function BookList({ books }) {
  console.log(books)
  
  const book = books.slice(0,30).map((book, index) =>  {
    return(
    <BookCard key={index} book={book} />
  )})

  return (
    <div className='book-list'>
      <div className='container'>
        <div className='section-title'>
          <h2>{books.title}</h2>
        </div>
        <div className='book-list-content grid'>
          {book}
        </div>

      </div>
    </div>
  );
}

export default BookList