import React, { useEffect, useState } from "react";
import BookCard from './Books/BookCard'
import BookList from './Books/BookList'


function FilterBooks({filter}){

  const [books, setBooks] = useState([])
  const [searchResult, setSearchResult] = useState('');
  const [api_Url, set_Api_Url] = useState('https://example-data.draftbit.com/books?_sort=rating&_order=desc');
  
  useEffect(() => {
    if (filter === 'Featured'){
      set_Api_Url('https://example-data.draftbit.com/books?_sort=rating_count&_order=desc');
    }else if (filter === "Title"){
      set_Api_Url('https://example-data.draftbit.com/books?_sort=title&_order=asc');
    }else if (filter === 'Author'){
      set_Api_Url('https://example-data.draftbit.com/books?_sort=authors&_order=asc');
    }else if (filter === 'Fantasy'){
      set_Api_Url('https://example-data.draftbit.com/books?_limit=5');
    }
  }, [filter]);

  useEffect(() => {
    fetch(api_Url)
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
          genre_list: item.genre_list,
          image_url: item.image_url,
        };
      })
    setBooks(specificBooksData);
    })
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