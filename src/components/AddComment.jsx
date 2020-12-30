import React, { useState } from 'react';

const AddComment = (props) => {
  const [content, setContent] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setContent(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    props.onCreate(content);

    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="AddComment">
      <input
        type="text"
        name="content"
        placeholder="Comment"
        value={content}
        onChange={handleChange}
      />
      <input className="create" type="submit" value="Create Comment" />
    </form>
  );
}

export default AddComment;
