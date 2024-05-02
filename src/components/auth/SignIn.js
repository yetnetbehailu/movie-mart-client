import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './signIn.css'

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        UserName: '',
        Email:'',
        PasswordHash: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const successMessage = searchParams.get('success');
        if (successMessage) {
            setSuccessMessage(successMessage);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    }, [location.search]); // Watch for changes in location.search


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear corresponding error message when the input changes
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form field validation
        const validationErrors = {};
        if (!formData.UserName && !formData.Email) {
            validationErrors.UserName = 'Please provide a username or email';
            validationErrors.Email = 'Please provide a username or email';
        }
        else if (!formData.Email && (formData.UserName.length < 4 || formData.UserName.length > 20)) {
            validationErrors.UserName = 'Username must be between 4-20 characters';
        }
        else if (!formData.Email && !/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/.test(formData.UserName)) {
            validationErrors.UserName = 'Username must contain only letters, numbers, underscores, hyphens, and include at least 1 letter';
        }

        if (!formData.PasswordHash) {
            validationErrors.PasswordHash = 'Please enter your password';
        }
        else if (formData.PasswordHash.length < 8) {
            validationErrors.PasswordHash = 'Password must be at least 8 characters long';
        }
        else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}/.test(formData.PasswordHash)) {
            validationErrors.PasswordHash = 'Password must include uppercase, lowercase, number, and special character';
        }

        if (Object.keys(validationErrors).length > 0) {
            // Set validation errors & prevent form submission
            setErrors(validationErrors);
            return;
        }

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
            setErrors({});
            setErrors({ general: 'Invalid username, email, or password. Please try again' });
            console.error('Sign in Error:', err);
        }
    };

    return (
        <>
            {successMessage && (
                <div className="alert alert-success toast-success" role="alert">
                    {successMessage}
                </div>
            )}
            <div className='signin-container'>
                <form className='signin-form' onSubmit={handleSubmit}>
                    <h1 className='signin-title'>Sign In</h1>
                    <p className="signin-note ps-1 mb-1 text-muted"> Enter username or email</p>
                    <input type="text" name="UserName" placeholder="Username"
                        value={formData.UserName} onChange={handleChange} />
                    {errors.UserName && <p className="validation-error mb-2">{errors.UserName}</p>}

                    <input type="email" name="Email" placeholder="Email"
                        value={formData.Email} onChange={handleChange} />
                    {errors.Email && <p className="validation-error mb-2">{errors.Email}</p>}


                    <input type="password" name="PasswordHash" placeholder="Password"
                        value={formData.PasswordHash} onChange={handleChange} />
                    {errors.PasswordHash && <p className="validation-error mb-0">{errors.PasswordHash}</p>}
                    {errors.general && <p className="validation-error mb-0">{errors.general}</p>}
                    <button type="submit" className='btn signin-form-btn mt-3'>Sign In</button>
                </form>
            </div>
        </>
    );
};

export default SignIn;