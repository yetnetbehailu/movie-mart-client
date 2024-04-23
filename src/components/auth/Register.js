import React, { useState } from 'react';
import axios from 'axios';
import './register.css'

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5012/api/auth/register', {
                UserName: formData.username,
                Email: formData.email,
                PasswordHash: formData.password
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
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className='mb-3' />
                <button type="submit" className='btn register-form-btn'>Register</button>
            </form>
        </div>
    );
};

export default Registration;