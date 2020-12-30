// if you just do firebase, you'll get everything. db, messaging, app. increases bundle size unnecessarily
// this just as much firebase you need to get by
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Your web app's Firebase configuration
import config from './config.json'

// Initialize Firebase
firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

// solely for demonstration purposes and debugging, DEFINITELY NOT BEST PRACTICES
window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // get a reference to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);

  // go and fetch the document from that location
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error('Error creating user', error);
    }
  }

  return getUserDocument(user.uid);
}

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.doc(`users/${uid}`);
    // const userDocument = await firestore.doc(`users/${uid}`).get(); //this also works, in addition to `users/${user.uid}`
    // return { uid, ...userDocument.data() };
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
}

export default firebase;
