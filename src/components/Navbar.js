import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"; // jwt-decode library for decoding JWT tokens

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [UserName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Decode the token payload to access user information
            const decodedToken = jwtDecode(token);
            // From the decoded payload
            const { 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': UserName } = decodedToken;
            setUserName(UserName);
            setIsLoggedIn(true);
        } else {
            setUserName('');
            setIsLoggedIn(false);
        }
    }, []);

    const handleSignOut = () => {
        // Clear token from local storage
        localStorage.removeItem('token');
        setIsLoggedIn(false);
         // Reload the page to reflect updated authentication status
        window.location.reload();

        window.location.href = '/movies';
    };

    return(
        <nav className='navbar navbar-expand-lg bg-nav'>
            <div className='container'>
                <Link className='navbar-brand' to="/">MovieMart</Link>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' 
                    aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        {/* Use Link component instead of <a> for navigation */}
                        <Link className="nav-link active" to="/movies">Movies</Link>
                        </li>
                        {/* Render links based on authentication status */}
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Hi {UserName}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn nav-link" onClick={handleSignOut}>Sign out</button>
                                </li>
                            </>
                            ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin">Sign in</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;