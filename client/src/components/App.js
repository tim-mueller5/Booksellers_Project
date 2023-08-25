import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import BookList from './BookList';
import './App.css';

function App() {
  return (
    <main className='App'>
        <Header />
        <BookList />
    </main>
  )
}

export default App;
