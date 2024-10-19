import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
  Handles user authenticaion with input for username and password
  along with a login button and when successful login it goes to dashboard
*/

const Login = ({ onLogin }) => {
  // state vars
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // hook to navigate
  const navigate = useNavigate();
  // potential error handler
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  // function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // include cookies for session management
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      console.log('DATAFIRSTNAME', data.firstName);

      // upon successful login, update state
      if (response.ok) {
        onLogin({ isLoggedIn: true, firstName: data.firstName });
        // onLogin(true); // Update the login state to true
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        console.error('Login failed:', data);
      }
    } catch (err) {
      console.error('Error during login:', err);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // prevent refresh on submit

  //   if (username === 'user' && password === 'password') {
  //     onLoginSucess(); // call parent func if login is right
  //   } else {
  //     // show alert if login is wrong
  //     alert('invalid login');
  //   }
  // };

  return (
    <div className='loginBody'>
      <div className='loginComponent'>
        <h2 className='pageTitle'>HOAme</h2>
        <p className='mantra'>You're almost hoame</p>

        {/* input field for username */}
        <input
          type='text'
          placeholder='Username'
          value={username}
          className='loginPrompt'
          onChange={(e) => setUsername(e.target.value)} // update state
        />

        {/* input field for password */}
        <input
          type='password'
          placeholder='Password'
          className='loginPrompt'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* button for login */}
        <div className='loginButton'>
          <button onClick={handleLogin} type='submit' className='loginButton1'>
            Login
          </button>

          {/* potential button for google login */}
          <button
            onClick={() => alert('Google login clicked')}
            className='loginButton1'
          >
            {' '}
            Login with Google{' '}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
