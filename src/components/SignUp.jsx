import React, { useState } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

const SignUp = () => {
  const [inputs, setInputs] = useState({ displayName: '', email: '', password: '' });

  const handleChange = event => {
    const { name, value } = event.target;

    setInputs((prevState) => {
      return ({
        ...prevState,
        [name]: value,
      })
    })
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password } = inputs;
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error);
    }

    setInputs({ displayName: '', email: '', password: '' });
  };

  return (
    <form className="SignUp" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={inputs.displayName}
        onChange={handleChange}
      />
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
      <input type="submit" value="Sign Up" />
    </form>
  );
}

export default SignUp;
