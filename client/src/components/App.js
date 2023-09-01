import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from './Header/Header';
import CreateNewUser from "./NewUser/CreateNewUser";
import Login from "./Login/Login";
import AccountDetails from "./Account/AccountDetails";
import BookDetails from './Books/BookDetails';
import FilterButtons from './BookFilters/FilterButtons';


function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);
  
  return (
    <main>
        <Header user={user} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <Routes>
          <Route exact path='/' element={<FilterButtons setSearchTerm={setSearchTerm} searchTerm={searchTerm} user={user}/>} />
          <Route exact path="/login" element={(user != null) ? 
            <AccountDetails user={user} setUser={setUser} /> 
            :<Login user={user} setUser={setUser}/>}/>
          <Route exact path="/create" element={<CreateNewUser user={user} setUser={setUser}/>}/>
          <Route exact path='/book/:id' element={<BookDetails user={user}/>} />
        </Routes>
    </main>
  )
}

export default App;
