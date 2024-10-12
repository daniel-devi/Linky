import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * SignUpPage component for user registration
 * @returns {JSX.Element} The rendered sign-up form
 */
function SignUpPage() {
    // State hooks for form inputs
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    /**
     * Handles the sign-up process
     * @async
     */
    const handleSignup = async () => {
        try {
            // Send POST request to register endpoint
            const response = await axios.post('/api/register/', {
                email,
                username,
                password,
            });
            // Notify user of successful registration
            alert("Registration successful!")
            navigate('/login');
        } catch (error) {
            // Log any errors that occur during registration
            console.error('Registration error:', error);
            // TODO: Consider displaying a user-friendly error message
        }
    };

    return (
        <>
            <h1>Sign Up</h1>
            <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <br />
            <input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Username" 
            />
            <br />
            <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                type="password" 
                placeholder="Password" 
            />
            <br />
            <button onClick={handleSignup}>Sign Up</button>
            <p>Already have an account? <a href="/login">Login</a></p>
        </>
    );
}

export default SignUpPage;
