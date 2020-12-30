import React, { useState } from 'react';
import { auth, firestore, storage } from '../firebase';

const UserProfile = () => {
  const [displayName, setDisplayName] = useState('');
  let imageInput = null;

  const uid = () => {
    return auth.currentUser.uid;
  }

  const userRef = () => {
    return firestore.doc(`users/${uid()}`);
  }

  const file = () => {
    console.log('imageInput', imageInput);
    return imageInput && imageInput.files[0];
  }

  const handleChange = event => {
    const { value } = event.target;
    setDisplayName(value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    if (displayName) {
      userRef().update({ displayName });
    }
    setDisplayName('');

    if (file()) {
      storage
        .ref()
        .child('user-profiles')
        .child(uid())
        .child(file().name)
        .put(file())
        .then(response => response.ref.getDownloadURL())
        .then(photoURL => userRef().update({ photoURL }))
        .then(() => { imageInput = null })
        .catch(error => console.error(error));
    }
  }

  return (
    <section className="UserProfile">
      <form onSubmit={handleSubmit}>
        <input type="text" value={displayName} name="displayName" onChange={handleChange} placeholder="Display Name" />
        <input type="file" ref={ref => imageInput = ref} />
        <input className="update" type="submit" />
      </form>
    </section>
  )
}

export default UserProfile;
