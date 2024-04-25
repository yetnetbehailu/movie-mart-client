import React, { useState } from 'react';
import axios from 'axios';
import './register.css'

const Registration = () => {
    const [formData, setFormData] = useState({
        UserName: '',
        Email: '',
        PasswordHash: ''
    });

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
    
            console.log('Registration successful:', response);

        } catch (error) {

            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className='register-title'>Register</h2>
                <input type="text" name="UserName" placeholder="Username" value={formData.UserName} onChange={handleChange} />
                <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} />
                <input type="password" name="PasswordHash" placeholder="Password" value={formData.PasswordHash} onChange={handleChange} className='mb-3' />
                <button type="submit" className='btn register-form-btn'>Register</button>
            </form>
        </div>
    );
};

export default Registration;