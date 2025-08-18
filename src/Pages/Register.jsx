import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        setMessage(''); // Clear previous messages

        try {
            // Send a POST request to our backend's register endpoint
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                fullName,
                email,
                phoneNumber,
                address,
                password,
            });
            setMessage(response.data); // Set the success message from the backend
        } catch (error) {
            // *** THIS IS THE UPDATED PART ***
            // Check if the error response and its data exist
            if (error.response && error.response.data) {
                // If the data is an object with a 'message' or 'error' property, use that.
                // Otherwise, use the data directly (for our simple string errors).
                const errorMessage = error.response.data.message || error.response.data.error || error.response.data;
                setMessage(errorMessage);
            } else {
                setMessage('Error: Could not connect to the server.');
            }
        }
    };

    return (
        <div>
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                 <div>
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;