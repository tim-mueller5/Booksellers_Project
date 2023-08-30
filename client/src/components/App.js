import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from './Header/Header';
import NavBar from './NavBar/NavBar';
import BookList from './Books/BookList';
import BookDetails from './Books/BookDetails';
import FilterBooks from './FilterBooks';
import FilterButtons from './FilterButtons';
import BookCard from './Books/BookCard';
import './App.css';


function App() {

  return (
    <main className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<FilterButtons />} />
        <Route path='/book/:id' element={<BookDetails />} />
      </Routes> 
    </main>
  )
}

export default App;
