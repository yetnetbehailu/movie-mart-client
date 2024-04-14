import React,{ useState, useEffect} from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import { Link } from "react-router-dom";
import "./movies.css";
import { formatDate } from "../../helpers/formatDate";

// MovieList functional component
const MovieList = () => {

    // Define state to hold the list of movies
    const [movies, setMovies] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    // useEffect hook to fetch movies when the component is first rendered
    useEffect(() => {
        // Define a function to fetch movies from the backend API
        const fetchMovies = async () => {
            try {
                // Make a GET request to the backend API to fetch movies
                const response = await axios.get('http://localhost:5012/api/movies/');
                // Update the state with the fetched movies
                setMovies(response.data);
                const searchParams = new URLSearchParams(window.location.search);
                const successMessage = searchParams.get('success');
                if (successMessage) {
                    setSuccessMessage(successMessage);
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 2500);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []); // The empty dependency array ensures this effect will be executed only once when the component is first rendered

    // Render the MovieList component
    return (
        <>
            {successMessage && (
                <div className="alert alert-success toast-success" role="alert">
                    {successMessage}
                </div>
            )}
            <div className="container pt-4">
                <div className="row">
                    <div className="create-movie-content">
                    <span className="py-1 px-2">Click here to add a movie</span>
                    <Link to="/movies/create" className="btn create-movie-btn">
                        <i className="pe-1 fa-regular fa-square-plus fa-sm"></i>New
                    </Link>
                    </div>
                </div>
                <div className="row">
                    {/* Map over the list of movies to render use movieId as key to identify each movie */}
                    {movies.map(movie => (
                    <div key={movie.movieId} className="col-12 col-md-6 col-lg-4 col-xl-3 movie-card text-font">
                        <p className="card-genre fs-5">
                            <mark>{movie.genre.name}</mark>
                        </p>
                        <a>
                            <img src={movie.imageUrl} alt={`Movie ${movie.title}`} className="movie-image" />
                        </a>
                        <div className="text-center mt-2">
                            <p className="mb-0">
                                {movie.title}
                            </p>
                            <p className="fs-5">
                                Director: {movie.director.name}
                            </p>
                        </div>
                        <div className="d-flex justify-content-evenly mt-2">
                        <Link to={`/movies/edit/${movie.movieId}`} className="btn card-btn">
                            <i className="fa-regular fa-pen-to-square fa-sm p-1"></i>Edit
                        </Link>
                            <button className="btn card-btn"><i className="fa-regular fa-trash-can fa-sm p-1"></i>Delete</button>
                        </div>
                        <p className="text-center my-1">
                            <small className="text-muted fs-date">Release date: <span>{formatDate(movie.releaseDate)}</span></small>
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
};

// Export the MovieList component as the default export
export default MovieList;