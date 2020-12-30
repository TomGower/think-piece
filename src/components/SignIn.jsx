import React, { useState } from 'react';
import { signInWithGoogle } from '../firebase';

const SignIn = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setInputs(prevState => {
      return ({
        ...prevState,
        [name]: value,
      })
    })
  };

  const handleSubmit = event => {
    event.preventDefault();
    setInputs({ email: '', password: '' });
  };

  return (
    <form className="SignIn" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={inputs.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={inputs.password}
        onChange={handleChange}
      />
      <input type="submit" value="Sign In" />
      <button onClick={signInWithGoogle}>Sign In With Google</button>
    </form>
  );
}

export default SignIn;
