import React, { useState, useEffect, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribeFromFirestore = firestore.collection('posts').onSnapshot(snapshot => {
        const currentPosts = snapshot.docs.map(collectIdsAndDocs);
        setPosts(currentPosts);
      });

    return function cleanup () {
      unsubscribeFromFirestore();
    }
  }, []);

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  )
}

export default PostsProvider;
