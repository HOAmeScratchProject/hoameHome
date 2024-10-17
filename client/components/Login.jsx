import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  // handle form submission and submist logic

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      onLogin(data);
    } catch (err) {}
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
    <div>
      <div className='loginComponent'>
        <h2 className='pageTitle'>HOAme</h2>
        <p className='mantra'>You're almost hoame</p>
        <input
          type='text'
          placeholder='Username'
          value={username}
          className='loginPrompt'
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type='password'
          placeholder='Password'
          className='loginPrompt'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='loginButton'>
          <button onClick={handleLogin} type='submit' className='loginButton1'>
            Next
          </button>

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
