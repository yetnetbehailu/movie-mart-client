import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import Navbar from './components/Navbar';
import MovieList from './components/movies/MovieList';
import './App.css';

function App() {
  return (
    <Router> {/* BrowserRouter */}
      <>
        {/* Render Navbar component */}
        <Navbar />
        {/* Render the MovieList component */}
        <MovieList />
      </>
    </Router>
  );
}

export default App;
