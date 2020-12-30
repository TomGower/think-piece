import React, { useState, useEffect, createContext } from 'react';
import { auth, createUserProfileDocument } from '../firebase';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          let newUser = { uid: snapshot.id, ...snapshot.data()};
          setUser(newUser);
        });
      }
      setUser(userAuth);
    });

    return function cleanup () {
      unsubscribeFromAuth();
    }
  }, []);

  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  )
}

export default UserProvider;
