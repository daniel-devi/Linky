import axios from "axios";
import { useState } from "react";

/**
 * LoginPage component for handling user authentication
 * @returns {JSX.Element} Rendered login form
 */

function LoginPage() {
  // State hooks for email and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Handles the login process
   * @async
   */
  const handleLogin = async () => {
    try {
      // Send login request to the API
      console.log(username, password);
    const response = await axios.post(
        "http://localhost:8000/login/",
        { "username": username, "password": password },
        
      );

      // Store the access token in local storage
      console.log(response.data);
      localStorage.setItem("token", response.data.access);
      // Redirect to the home page
      window.location.href = "/";
    } catch (error) {
      // Log any errors that occur during the login process
      console.error(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/signup">Register</a>
      </p>
    </>
  );
}

export default LoginPage;
