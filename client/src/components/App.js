import React, { useEffect, useState } from "react";
import { Router, Routes, Route } from "react-router-dom";

import Header from './Header/Header';
import BookList from './Books/BookList';
import CreateNewUser from "./NewUser/CreateNewUser";
import Login from "./Login/Login";
import './App.css';

function App() {

  const [books, setBooks] = useState([])
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  return (
    <main className='App'>
        <Header />
        <Routes>
          <Route exact path="/" element={<BookList books={books}/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/create" element={<CreateNewUser/>}/>
        </Routes>
    </main>
  )
}

export default App;
