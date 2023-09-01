import React, { useEffect, useState } from "react";
import BookList from '../Books/BookList'

function FilterBooks({ filter, searchTerm, setSearchTerm }){

  const [books, setBooks] = useState([])
  const [api_Url, set_Api_Url] = useState('/books');

  useEffect(() => {
    if (searchTerm !== ""){
      set_Api_Url(`https://example-data.draftbit.com/books?q=${searchTerm}`)
    }
  }, [searchTerm]);

  useEffect(() => {
    if (filter === 'Featured'){
      setSearchTerm('');
      set_Api_Url('/books/featured');
    }else if (filter === "Title"){
      setSearchTerm('');
      set_Api_Url('/books/title');
    }else if (filter === 'Author'){
      setSearchTerm('');
      set_Api_Url('/books/authors');
    }else if (filter === 'Fantasy'){
      setSearchTerm('');
      set_Api_Url('/books/fantasy');
    }else if (filter === 'Fiction'){
      setSearchTerm('');
      set_Api_Url('/books/fiction');
    }else if (filter === 'Classics'){
      setSearchTerm('');
      set_Api_Url('/books/classics');  
    }else if (filter === 'Romance'){
      setSearchTerm('');
      set_Api_Url('/books/romance'); 
    }else if (filter === 'Non-fiction'){
      setSearchTerm('');
      set_Api_Url('/books/nonfiction');
    }
  }, [filter]);

  useEffect(() => {
    fetch(api_Url)
    .then(response => response.json())
    .then(data => {setBooks(data)})
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }, [api_Url]);

  return(
    <div>
      <BookList books={books}/>
    </div>
  )
}
export default FilterBooks
