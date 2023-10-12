import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: email, Password: password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
  
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', token); // You can choose between localStorage and sessionStorage
  
        // Include the headers in your fetch request for protected routes
        // const headers = {
        //   'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${token}`,
        // };
  
        // Example: Fetch a protected route
        // const protectedRouteResponse = await fetch('/protected-route', {
        //   method: 'GET',
        //   headers: headers,
        // });
  
        // Handle the response for the protected route here
  
        // Redirect to the dashboard
        navigate('/dashboard');
      } else {
        // Handle login failure by displaying an error message
        setError('Invalid email or password');
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      // Handle other errors here
      console.error('Login failed:', error);
    }
  };
  

  return (
    <div className="mx-auto">
      <div className="bg-orange-500 px-5 py-5 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-white">Login</h2>
      </div>

      <div className="bg-white flex flex-col items-center justify-center mt-24">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2">
          <div className="m-5">
            <input
              type="text"
              id="Email"
              placeholder="Email"
              name="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="m-5">
            <input
              type="password"
              id="Password"
              placeholder="Password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-orange-500"
            />
          </div>

          {error && (
            <div className="m-5 text-orange-500">{error}</div> // Display error message
          )}

          <div className="flex flex-col justify-center items-center mt-8">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 rounded cursor-pointer mb-4 md:mb-0"
            >
              Login
            </button>
            <Link to="/register" className="text-black">
              Don't have an account?{' '}
              <span className="font-bold text-orange-500 hover:underline">Register</span>
            </Link>
          </div>
          <button type="submit" className="hidden" />
        </form>
      </div>
    </div>
  );
};

export default Login;
