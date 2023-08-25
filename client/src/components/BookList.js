import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";


const Books = () =>{
  const API_URL = 'https://example-data.draftbit.com/books?_limit=200'
  return (
    <div className='book-list'>Book List</div>
  )
}

export default Books;