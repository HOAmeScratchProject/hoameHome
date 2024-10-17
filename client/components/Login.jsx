import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // handle form submission and submist logic
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent refresh on submit
// ///// Add try block fetching to /login endpoing/route sending a POST request object including method: POST, headers: application/json and body passing username & password. If true response in returned data, activate isLoggedIn setter function passed as props from App.js to true.
    if (username === 'user' && password === 'password') {
      onLoginSucess(); // call parent func if login is right
    } else {
      // show alert if login is wrong
      alert('invalid login');
    }
  };

  return (
    <div>
      <h2> Your're Almost HOAme! </h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type='submit'>Login</button>
      </form>
      <button onClick={() => alert('Google login clicked')}>
        {' '}
        Login with Google{' '}
      </button>
    </div>
  );
};

export default Login;
