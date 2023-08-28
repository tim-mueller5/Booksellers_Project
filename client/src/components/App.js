import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Header from './Header/Header';
import BookList from './Books/BookList';
import './App.css';

function App() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch('https://example-data.draftbit.com/books?_limit=200')
      .then(response => response.json())
      .then(data => {
        const specificBooksData = data.map(item => {
          return {
            id: item.id,
            title: item.title,
            authors: item.authors,
            description: item.description,
            num_pages: item.num_pages,
            rating: item.rating,
            rating_count: item.rating_count,
            genres: item.genres,
            image_url: item.image_url,
          };
        })
      setBooks(specificBooksData);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });

  }, []);
  
  return (
    <main className='App'>
        <Header />
        <BookList books={books}/>
    </main>
  )
}

export default App;
