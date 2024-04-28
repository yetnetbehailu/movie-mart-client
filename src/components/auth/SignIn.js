import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signIn.css'

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        UserName: '',
        Email:'',
        PasswordHash: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5012/api/auth/login/', formData);
            const { token } = res.data;
            // Store JWT-token in localStorage
            localStorage.setItem('token', token);
            // After successful Sign in redirect to movie listing page
            navigate('/movies');
            // Reload window to update authentication status
            window.location.reload();
        } 
        catch (err) {
        setError('Invalid username, email, or password. Please try again');
        console.error('Sign in Error:', err);
        }
    };

    return (
        <div className='signin-container'>
            <form className='signin-form' onSubmit={handleSubmit}>
                <h1 className='signin-title'>Sign In</h1>
                <p className="signin-note ps-1 mb-1 text-muted"> Enter username or email</p>
                <input type="text" name="UserName" placeholder="Username"
                    value={formData.UserName} onChange={handleChange} />

                <input type="email" name="Email" placeholder="Email"
                    value={formData.Email} onChange={handleChange} />

                <input type="password" name="PasswordHash" placeholder="Password"
                    value={formData.PasswordHash} onChange={handleChange} className='mb-3' />
                {error && <p className='signin-error' style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className='btn signin-form-btn'>Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;