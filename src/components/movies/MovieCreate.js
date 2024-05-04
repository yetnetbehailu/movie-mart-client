import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./movieCreate.css";

const MovieCreate = () => {
    const navigate = useNavigate(); // Initialize navigate hook

    // Define state for movie data
    const [movieData, setMovieData] = useState({
        title: '',
        director: '',
        genre: '',
        description: '',
        releaseDate: '',
        language: '',
        duration: '',
        imageUrl: '',
        actors: []
    });


    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});

    // Function handles changes in form input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update movieData state
        if (name === 'genre' || name === 'director') {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
            setMovieData(prevState => ({
                ...prevState,
                [name]: { name: value }
            }));
        }
        else if (name === 'actors') {
            // Split the string of actors into an array and format it as a list of objects
            const actorsArray = value.split(',').map(actor => ({ Name: actor.trim() }));
            setErrors((prevErrors) => ({ ...prevErrors, actors: '' }));
            setMovieData(prevState => ({
                ...prevState,
                actors: actorsArray
            }));
        } 
        else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
            setMovieData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Function to extract the name from genre or director object
    const extractName = (input) => {
        return input && typeof input === 'object' ? input.name : input;
    };


    // Handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set duration & releaseDate to null if they're empty strings to match backend expectations
        const movieDataToSend = {
            ...movieData,
            duration: movieData.duration === '' ? null : movieData.duration,
            releaseDate: movieData.releaseDate === '' ? null : movieData.releaseDate
        };

        // Form field validations
        const validationErrors = {};

        if (!movieData.title || !extractName(movieData.title).trim()) {
            validationErrors.title = 'Title is required';
        }
        else if (extractName(movieData.title).length > 50) {
            validationErrors.title = 'Title must not exceed 50 characters';
        }

        if (!movieData.director || !extractName(movieData.director).trim()) {
            validationErrors.director = 'Director is required';
        }
        else if (extractName(movieData.director).length > 25) {
            validationErrors.director = 'Director name must not exceed 25 characters';
        }

        if (!movieData.genre || !extractName(movieData.genre).trim()) {
            validationErrors.genre = 'Genre is required';
        }
        else if (extractName(movieData.genre).length > 15) {
            validationErrors.genre = 'Genre must not exceed 15 characters';
        }

        if (extractName(movieData.description).trim().length > 1000) {
            validationErrors.description = 'Description must be less than 1000 characters';
        }

        if (!movieData.language || !extractName(movieData.language).trim()) {
            validationErrors.language = 'Language is required';
        }
        else if (extractName(movieData.language).length > 25) {
            validationErrors.language = 'Language must not exceed 25 characters';
        }

        if (movieData.actors.map(actor => actor.Name).join(',').trim().length > 1000) {
            validationErrors.actors = 'Actors must be less than 1000 characters';
        }        

        // Validate optional fields
        if (movieData.releaseDate.trim() && !isValidDate(movieData.releaseDate)) {
            validationErrors.releaseDate = 'Invalid date format';
        }
        if (movieData.duration && extractName(movieData.duration).trim() && !isValidTime(movieData.duration.trim())) {
            validationErrors.duration = 'Invalid time format';
        }
        if (movieData.imageUrl.trim() && !isValidUrl(movieData.imageUrl)) {
            validationErrors.imageUrl = 'Invalid URL format';
        }

        if (Object.keys(validationErrors).length > 0) {
            // Set validation errors & prevent form submission
            setErrors(validationErrors);
            return;
        }
        try {
            console.log(movieData);
            // Send the complete movieData object to the backend URL(http://localhost:5012/api/movies) for movie creation
            const response = await axios.post('http://localhost:5012/api/movies/', movieDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            
            if (response.status === 200) {
                // Redirect to MovieList page with success message as query parameter
                navigate('/movies?success=Movie created successfully!');
            } else {
                setErrorMessage('Failed to create movie. Please try again!');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            setErrorMessage('An error occurred while creating the movie');
        }

    };

    // Validate date format
    const isValidDate = (dateString) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    };

    // Validate time format
    const isValidTime = (timeString) => {
        return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(timeString);
    };

    // Validate URL format
    const isValidUrl = (urlString) => {
        return /^(http|https):\/\/[^ ' "]+$/.test(urlString);
    };

    return (
        <>
            {errorMessage && (
                <div className="alert alert-danger toast-error" role="alert">
                    {errorMessage}
                </div>
            )}
            <div className="container">
                <div className="row">
                    <div className="col-10 offset-1 col-md-8 offset-md-2 movie-form">
                        <h1 className="form-title">Create a new movie</h1>
                        <form onSubmit={handleSubmit} className="form-content" >
                            <div className="mb-3 mt-3 d-flex flex-column">
                                <div className="d-flex">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={movieData.title} onChange={handleChange} />
                                </div>
                                {errors.title && <p className="validation-error text-end mb-0 adjust-error-padd">{errors.title}</p>}
                            </div>
                            <div className="mb-3 d-flex flex-column">
                                <div className="d-flex">
                                    <label htmlFor="genre" className="form-label">Genre</label>
                                    <input type="text" className="form-control" id="genre" name="genre" value={extractName(movieData.genre)} onChange={handleChange}/>
                                </div>
                                {errors.genre && <p className="validation-error text-end mb-0 adjust-error-padd">{errors.genre}</p>}
                            </div>
                            <div className="mb-3 d-flex flex-column">
                                <div className="d-flex">
                                    <label htmlFor="director" className="form-label">Director</label>
                                    <input type="text" className="form-control" id="director" name="director" value={extractName(movieData.director)} onChange={handleChange}/>
                                </div>
                                {errors.director && <p className="validation-error text-end mb-0 adjust-error-padd">{errors.director}</p>}
                            </div>
                            <div className="mb-3 d-flex flex-column">
                                <div className="d-flex">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control textarea" id="description" name="description" value={movieData.description} onChange={handleChange}/>
                                </div>
                                {errors.description && <p className="validation-error text-end mb-0 adjust-error-padd">{errors.description}</p>}
                            </div>
                            <div className='row justify-content-center'>
                                <div className="col-md-6 mb-3 d-flex flex-column justify-content-center justify-content-md-start language-content">
                                    <div className="d-flex">
                                        <label htmlFor="language" className="form-label">Language</label>
                                        <input type="text" className="form-control" id="language" name="language" value={movieData.language} onChange={handleChange}/>
                                    </div>
                                    {errors.language && <p className="validation-error text-end mb-0">{errors.language}</p>}
                                </div>
                                <div className="col-md-6 mb-3 d-flex flex-column justify-content-center justify-content-md-start duration-content">
                                    <div className="d-flex">
                                        <label htmlFor="duration" className="form-label">Duration</label>
                                        <input type="text" className="form-control" id="duration" name="duration" value={movieData.duration} onChange={handleChange} placeholder="HH:MM:SS"/>
                                    </div>
                                    {errors.duration && <p className="validation-error text-end mb-0">{errors.duration}</p>}
                                </div>
                            </div>
                            <div className='mb-3 d-flex flex-column'>
                                <div className="d-flex">
                                    <label htmlFor='actors' className='form-label'>Actors</label>
                                    <textarea className='form-control' id="actors" name="actors" placeholder='Separate names with commas(,)' value={movieData.actors.map(actor => actor.Name).join(',')} onChange={handleChange}/>
                                </div>
                                {errors.actors && <p className="validation-error text-end mb-0 adjust-error-padd">{errors.actors}</p>}
                            </div>
                            <div className='row justify-content-center'>
                                <div className="col-md-6 mb-3 d-flex flex-column justify-content-center justify-content-md-start image-content">
                                    <div className="d-flex">
                                        <label htmlFor="imageUrl" className="form-label">Image</label>
                                        <input type="text" className="form-control" id="imageUrl" placeholder="https://...." name="imageUrl" value={movieData.imageUrl} onChange={handleChange} />
                                    </div>
                                    {errors.imageUrl && <p className="validation-error text-end mb-0">{errors.imageUrl}</p>}
                                </div>
                                <div className="col-md-6 mb-3 d-flex flex-column justify-content-center justify-content-md-start date-content">
                                    <div className="d-flex">
                                        <label htmlFor="releaseDate" className="form-label">Rel. date</label>
                                        <input type="date" className="form-control" id="releaseDate" 
                                        name="releaseDate" value={movieData.releaseDate} onChange={handleChange} />
                                    </div>
                                    {errors.releaseDate && <p className="validation-error text-end mb-0">{errors.releaseDate}</p>}
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn form-create-btn">Enter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieCreate;