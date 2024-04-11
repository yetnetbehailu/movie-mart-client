import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;