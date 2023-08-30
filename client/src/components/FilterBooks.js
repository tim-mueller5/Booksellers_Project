import React, { useEffect, useContext, useState } from "react";
import BookCard from './Books/BookCard'
import BookList from './Books/BookList'
import { useGlobalContext } from './SearchBar/SearchBar'

function FilterBooks({ filter }){

  const [books, setBooks] = useState([])
  const [searchResult, setSearchResult] = useState('');
  const [api_Url, set_Api_Url] = useState('https://example-data.draftbit.com/books?_sort=review_count&_order=desc&_limit=15');
  
  useEffect(() => {
    if (filter === 'Featured'){
      set_Api_Url('https://example-data.draftbit.com/books?_sort=rating&_order=desc&_limit=50');
    }else if (filter === "Title"){
      set_Api_Url('https://example-data.draftbit.com/books?_sort=title&_order=asc');
    }else if (filter === 'Author'){
      set_Api_Url('https://example-data.draftbit.com/books?_sort=authors&_order=asc');
    }else if (filter === 'Fantasy'){
      set_Api_Url('https://example-data.draftbit.com/books?q=fantasy');
    }else if (filter === 'Fiction'){
      set_Api_Url('https://example-data.draftbit.com/books?q=fiction');
    }else if (filter === 'Classics'){
      set_Api_Url('https://example-data.draftbit.com/books?q=classics');  
    }else if (filter === 'Romance'){
      set_Api_Url('https://example-data.draftbit.com/books?q=romance'); 
    }else if (filter === 'Non-fiction'){
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