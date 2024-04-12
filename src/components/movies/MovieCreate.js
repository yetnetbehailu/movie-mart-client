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

    // Function handles changes in form input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update movieData state
        if (name === 'genre' || name === 'director') {
            setMovieData(prevState => ({
                ...prevState,
                [name]: { name: value }
            }));
        }
        else if (name === 'actors') {
            // Split the string of actors into an array and format it as a list of objects
            const actorsArray = value.split(',').map(actor => ({ Name: actor.trim() }));
            setMovieData(prevState => ({
                ...prevState,
                actors: actorsArray
            }));
        } 
        else {
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

        try {
            console.log(movieData);
            // Send the complete movieData object to the backend URL(http://localhost:5012/api/movies) for movie creation
            const response = await axios.post('http://localhost:5012/api/movies/', movieData, {
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
                            <div className="mb-3 mt-3 d-flex">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title" value={movieData.title} onChange={handleChange} />
                            </div>
                            <div className="mb-3 d-flex">
                                <label htmlFor="genre" className="form-label">Genre</label>
                                <input type="text" className="form-control" id="genre" name="genre" value={extractName(movieData.genre)} onChange={handleChange}/>
                            </div>
                            <div className="mb-3 d-flex">
                                <label htmlFor="director" className="form-label">Director</label>
                                <input type="text" className="form-control" id="director" name="director" value={extractName(movieData.director)} onChange={handleChange}/>
                            </div>
                            <div className="mb-3 d-flex">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control textarea" id="description" name="description" value={movieData.description} onChange={handleChange}/>
                            </div>
                            <div className='row justify-content-center'>
                                <div className="col-md-6 mb-3 d-flex justify-content-center justify-content-md-start language-content">
                                    <label htmlFor="language" className="form-label">Language</label>
                                    <input type="text" className="form-control" id="language" name="language" value={movieData.language} onChange={handleChange}/>
                                </div>
                                <div className="col-md-6 mb-3 d-flex justify-content-center justify-content-md-start duration-content">
                                    <label htmlFor="duration" className="form-label">Duration</label>
                                    <input type="text" className="form-control" id="duration" name="duration" value={movieData.duration} onChange={handleChange} placeholder="HH:MM:SS"/>
                                </div>
                            </div>
                            <div className='mb-3 d-flex'>
                                <label htmlFor='actors' className='form-label'>Actors</label>
                                <textarea className='form-control' id="actors" name="actors" placeholder='Separate names with commas(,)' value={movieData.actors.map(actor => actor.Name).join(',')} onChange={handleChange}/>
                            </div>
                            <div className='row justify-content-center'>
                                <div className="col-md-6 mb-3 d-flex justify-content-center justify-content-md-start image-content">
                                    <label htmlFor="imageUrl" className="form-label">Image</label>
                                    <input type="text" className="form-control" id="imageUrl" placeholder="http://...." name="imageUrl" value={movieData.imageUrl} onChange={handleChange} />
                                </div>
                                <div className="col-md-6 mb-3 d-flex justify-content-center justify-content-md-start date-content">
                                    <label htmlFor="releaseDate" className="form-label">Rel. date</label>
                                    <input type="date" className="form-control" id="releaseDate" 
                                    name="releaseDate" value={movieData.releaseDate} onChange={handleChange} />
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