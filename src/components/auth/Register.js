import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'

const Registration = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        UserName: '',
        Email: '',
        PasswordHash: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear corresponding error message when the input changes
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Form field validation
        const validationErrors = {};
        if (!formData.UserName) {
            validationErrors.UserName = 'Username is required';
        }
        else if (formData.UserName.length < 4 || formData.UserName.length > 20){
            validationErrors.UserName = 'Username must be between 4-20 characters';
        }
        else if (!/^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/.test(formData.UserName)) {
            validationErrors.UserName = 'Username must contain only letters, numbers, underscores, hyphens, and include at least 1 letter';
        }

        if (!formData.Email) {
            validationErrors.Email = 'Email is required';
        }

        if (!formData.PasswordHash) {
            validationErrors.PasswordHash = 'Password is required';
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
            const response = await axios.post('http://localhost:5012/api/auth/register', {
                UserName: formData.UserName,
                Email: formData.Email,
                PasswordHash: formData.PasswordHash
            });
    
            if (response.status === 200) {
                navigate('/signin?success=Registration successful, you can now sign in!');
            } else {
                setErrorMessage('Failed to register. Please try again!');
            }
        } catch (error) {

            setErrorMessage('An error occurred while registering');
        }
    };

    return (
        <>
            {errorMessage && (
                <div className="alert alert-danger toast-error" role="alert">
                    {errorMessage}
                </div>
            )}
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2 className='register-title'>Register</h2>
                    <input type="text" name="UserName" placeholder="Username" value={formData.UserName} onChange={handleChange} />
                    {errors.UserName && <p className="validation-error mb-2">{errors.UserName}</p>}

                    <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} />
                    {errors.Email && <p className="validation-error mb-2">{errors.Email}</p>}

                    <input type="password" name="PasswordHash" placeholder="Password" value={formData.PasswordHash} onChange={handleChange} />
                    {errors.PasswordHash && <p className="validation-error mb-0">{errors.PasswordHash}</p>}

                    <button type="submit" className='btn register-form-btn mt-3'>Register</button>
                </form>
            </div>
        </>
    );
};

export default Registration;