import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from './Header/Header';
import BookList from './Books/BookList';
import FilterBooks from './FilterBooks';
import FilterButtons from './FilterButtons';
import './App.css';


function App() {

  return (
    <main className='App'>
        <Header />
        <FilterButtons />
        <FilterBooks />
    </main>
  )
}

export default App;
