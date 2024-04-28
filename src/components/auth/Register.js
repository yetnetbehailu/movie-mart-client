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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                    <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} />
                    <input type="password" name="PasswordHash" placeholder="Password" value={formData.PasswordHash} onChange={handleChange} className='mb-3' />
                    <button type="submit" className='btn register-form-btn'>Register</button>
                </form>
            </div>
        </>
    );
};

export default Registration;