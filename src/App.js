import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Navbar from './components/Navbar';
import MovieList from './components/movies/MovieList';
import MovieCreate from './components/movies/MovieCreate';
import MovieEdit from './components/movies/MovieEdit';
import MovieDetails from './components/movies/MovieDetails';
import Registration from './components/auth/Register'; 
import SignIn from './components/auth/SignIn'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAdmin(false); // No token found, not an admin
          return; 
        }

        const response = await axios.get('http://localhost:5012/api/auth/user-roles/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const roles = response.data.roles;
        setIsAdmin(roles.includes('Admin')); // Check if user has admin role
      } catch (error) {
        console.error('Error fetching user roles:', error);
        setIsAdmin(false); // Error occurred during validation, not an admin
      }
    };

    fetchUserRole();
  }, []);
  
  const UnauthorizedMessage = () => (
    <div className="unauthorized-message-container">
      <div className="unauthorized-message">
        <h1>Unauthorized 401</h1>
        <p>You don't have access to this page.</p>
        <p>
          <Link to="/" className="go-back-link">
              <i className="fa-solid fa-angles-left"></i> Go back home
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <Router> {/* BrowserRouter */}
      <>
        {/* Render Navbar component */}
        <Navbar />
        <Routes>
          {/* Currently landing page also display the MovieList replace element when adding a separate landing page eg. <Home /> */}
          <Route path="/" element={<MovieList />} />
          {/* Render the movie associated components */}
          <Route path="/movies" element={<MovieList />} />
          <Route path='/movies/create' element={isAdmin ? <MovieCreate /> : <UnauthorizedMessage /> }></Route>
          <Route path='/movies/edit/:movieId' element={isAdmin ? <MovieEdit /> : <UnauthorizedMessage />}></Route>
          <Route path='/movies/details/:movieId' element={<MovieDetails />}></Route>
          {/* Render the authorization associated components */}
          <Route path='/register' element={<Registration />} />
          <Route path='/signin' element={< SignIn/>} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
