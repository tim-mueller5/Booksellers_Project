import React, { useEffect, useState } from "react";


function BookList({ books }) {
  console.log(books)
  // const [books, setBooks] = useState([])
  const [searchResult, setSearchResult] = useState('')

  return (
    <div className='book-list'>Book List</div>
  )
}

export default BookList;