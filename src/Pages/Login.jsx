import React,{useState} from 'react';
import axios from 'axios';

const Login= () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from reloading the page
        setMessage(''); // Clear previous messages

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email,
                password
            });
            setMessage(response.data);
        } catch (error) {
            if(error.response && error.response.data){
                setMessage(error.response.data);
            }else{
                setMessage('Error: could not connect to the server.');
            }
        }
    
};
return(
    <div>
        <h2>Login to Sentinel</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
    </div>
);
};
export default Login;