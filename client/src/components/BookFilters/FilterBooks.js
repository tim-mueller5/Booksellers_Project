import React, { useEffect, useState } from "react";
import BookList from '../Books/BookList'

function FilterBooks({ filter, searchTerm, setSearchTerm }){

  const [books, setBooks] = useState([])
  const [api_Url, set_Api_Url] = useState('https://example-data.draftbit.com/books?_sort=review_count&_order=desc&_limit=15');

  useEffect(() => {
    if (searchTerm !== ""){
      set_Api_Url(`https://example-data.draftbit.com/books?q=${searchTerm}`)
    }
  }, [searchTerm]);

  useEffect(() => {
    if (filter === 'Featured'){
      setSearchTerm('');
      set_Api_Url('https://example-data.draftbit.com/books?_sort=rating&_order=desc&_limit=50');
    }else if (filter === "Title"){
      setSearchTerm('');
      set_Api_Url('https://example-data.draftbit.com/books?_sort=title&_order=asc');
    }else if (filter === 'Author'){
      setSearchTerm('');
      set_Api_Url('https://example-data.draftbit.com/books?_sort=authors&_order=asc');
    }else if (filter === 'Fantasy'){
      setSearchTerm('');
      set_Api_Url('https://example-data.draftbit.com/books?q=fantasy');
    }else if (filter === 'Fiction'){
      setSearchTerm('');
      set_Api_Url('https://example-data.draftbit.com/books?q=fiction');
    }else if (filter === 'Classics'){
      setSearchTerm('');
      set_Api_Url('https://example-data.draftbit.com/books?q=classics');  
    }else if (filter === 'Romance'){
      setSearchTerm('');
      set_Api_Url('https://example-data.draftbit.com/books?q=romance'); 
    }else if (filter === 'Non-fiction'){
      setSearchTerm('');
      set_Api_Url('https://example-data.draftbit.com/books?q=nonfiction');
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