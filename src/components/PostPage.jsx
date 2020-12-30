import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import { firestore } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import { collectIdsAndDocs } from '../utilities';

import Comments from './Comments';
import Post from './Post';
// import WithUser from './WithUser'; // to get user, if this were a class component

const PostPage = (props) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const user = useContext(UserContext);

  const getPostId = () => {
    return props.match.params.id;
  }

  const getPostRef = () => {
    return firestore.doc(`/posts/${getPostId()}`);
  }

  const getCommentsRef = () => {
    return getPostRef().collection('comments');
  }

  useEffect(() => {
    const unsubscribeFromPost = getPostRef().onSnapshot(snapshot => {
      const thisPost = collectIdsAndDocs(snapshot);
      setPost(thisPost);
    });

    const unsubscribeFromComments = getCommentsRef().onSnapshot(snapshot => {
      const thisComments = snapshot.docs.map(collectIdsAndDocs);
      setComments(thisComments);
    });

    return function cleanup () {
      unsubscribeFromPost();
      unsubscribeFromComments();
    }
  }, []);

  const createComment = (comment) => {
    // const { user } = props;
    getCommentsRef().add({
      content: comment,
      user,
      createdAt: Date.now(),
    });
  }

  return (
    <section>
      {post && <Post {...post} />}
      <Comments comments={comments} onCreate={createComment} />
    </section>
  )

}

// export default withRouter(WithUser(PostPage)); // if this were a class component
export default withRouter(PostPage);
