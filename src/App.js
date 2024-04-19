import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Navbar from './components/Navbar';
import MovieList from './components/movies/MovieList';
import MovieCreate from './components/movies/MovieCreate';
import MovieEdit from './components/movies/MovieEdit';
import MovieDetails from './components/movies/MovieDetails';
import './App.css';

function App() {
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
          <Route path='/movies/create' element={<MovieCreate />}></Route>
          <Route path='/movies/edit/:movieId' element={<MovieEdit />}></Route>
          <Route path='/movies/details/:movieId' element={<MovieDetails />}></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
