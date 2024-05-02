import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import Modal from "./MovieDeleteModal";
import { formatDate } from "../../helpers/formatDate";
import { formatDuration } from "../../helpers/formatDuration";
import "./movieDetails.css"; 

const MovieDetails = () => {
    const navigate = useNavigate();

    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);
    const [userRole, setUserRole] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5012/api/movies/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const token = localStorage.getItem('token');
                setIsLoggedIn(!!token);
                if (!token) {
                    return;
                }
    
                const response = await axios.get('http://localhost:5012/api/auth/user-roles/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserRole(response.data.roles);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };
    
        fetchUserRole();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    if (error) return <div>Error: {error}</div>;
    
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5012/api/movies/${movieToDelete}`);
            navigate('/movies?success=Movie deleted successfully!');
        } catch (error) {
            console.error('Error deleting movie:', error);
        } finally {
            setMovieToDelete(null);
            setShowDeleteModal(false);
        }
    };
    return (
        <>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-12">
                        <Link to="/movies" className="go-back-link">
                            <i className="fa-solid fa-angles-left"></i> Go back
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {/* Display movie details */}
                    <div className="col-12  col-md-8 offset-md-2 text-font movie-details">
                        <div className="d-flex justify-content-between">
                            <p className="fs-5">
                                <mark>{movie.genre.name}</mark>
                            </p>
                            <p className="fs-6 pt-1">
                                Duration: {formatDuration(movie.duration)}
                            </p>
                        </div>
                        <img src={movie.imageUrl} alt={`Movie ${movie.title}`} className="movie-image" />
                        <div className="movie-details-body mt-2">
                            <p className="mb-0 text-center">
                                {movie.title}
                            </p>
                            <p className="fs-5">
                                Description: {movie.description}
                            </p>
                            <p className="fs-5">
                                Director: {movie.director.name}
                            </p>
                            <p className="fs-5">
                                Actors:
                                {movie.actors.map((actor, index) => (
                                    <span key={actor.actorId}>
                                    {index === 0 ? ` ${actor.name}` : `, ${actor.name}`}
                                    </span>
                                ))}
                            </p>
                            <p className="fs-5">
                                Language: {movie.language}
                            </p>
                            {userRole.includes('Admin') && (
                            <div className="d-flex justify-content-evenly mt-2">
                                <Link to={`/movies/edit/${movie.movieId}`} className="btn card-btn">
                                    <i className="fa-regular fa-pen-to-square fa-sm p-1"></i>Edit
                                </Link>
                                <button className="btn card-btn" onClick={() => {
                                    setMovieToDelete(movie.movieId);
                                    setShowDeleteModal(true);
                                    }}><i className="fa-regular fa-trash-can fa-sm p-1"></i>Delete
                                </button>
                            </div>
                            )}
                            {!userRole.includes('Admin') && (
                            <div className="text-center">
                                <Link to={isLoggedIn ? '#' : '/signin'} className="btn card-btn">Buy Now
                                    <i className="fa-solid fa-cart-shopping fa-sm p-1"></i>
                                </Link>
                            </div>
                            )}
                            <p className="text-center mt-2 mb-3">
                                <small className="text-muted fs-date">Release date: <span>{formatDate(movie.releaseDate)}</span></small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={showDeleteModal}
                movieTitle={movie.title}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
            />
        </>
    );
};

export default MovieDetails;