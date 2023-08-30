import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from './Header/Header';
import BookDetails from './Books/BookDetails';
import FilterButtons from './BookFilters/FilterButtons';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <main>
    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
    <Routes>
      <Route path='/' element={<FilterButtons setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>} />
      <Route path='/book/:id' element={<BookDetails />} />
    </Routes> 
    </main>
  )
}
export default App;