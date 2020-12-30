import React, { useState } from 'react';
import { firestore, auth } from '../firebase';

const AddPost = () => {
  const [inputs, setInputs] = useState({ title: '', content: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    
    setInputs((prevState) => {
      return ({
        ...prevState,
        [name]: value,
      })
    })
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    
    const { title, content } = inputs;
    const { uid, displayName, email, photoURL } = auth.currentUser || {};

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date(),
    }

    // onCreate(post);
    firestore.collection('posts').doc(post.id).set(post);

    setInputs({ title: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="AddPost">
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={inputs.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Body"
        value={inputs.content}
        onChange={handleChange}
      />
      <input className="create" type="submit" value="Create Post" />
    </form>
  );
}

export default AddPost;
