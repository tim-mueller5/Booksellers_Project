import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';
import BookCard from './BookCard'
import './BookList.css';

function BookList({ books }) {
  const book = books.map((book, index) =>  {
    return(<BookCard key={index} book={book} />)})
  
  const navigate = useNavigate();

  return (
    <div className='book-list'>
      <div className='container'>
        <div className='section-title'>
          {/* <h2>{books.title}</h2> */}
        </div>
        <div className='book-list-content grid'>
          {book}
        </div>

      </div>
    </div>
  );
}

export default BookList