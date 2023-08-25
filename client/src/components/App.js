import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import AllBooks from "./AllBooks";

function App() {
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
    fetch("/books")
    .then(resp => resp.json())
    .then(data => {
       setAllBooks(data)
       
    })
  }, [])

  return (
    <div>
      <Header/>
      <AllBooks allBooks={allBooks}/>
    </div>
  );
}

export default App;
