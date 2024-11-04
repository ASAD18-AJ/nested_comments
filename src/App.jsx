import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Comment from './Comment.jsx';
import './App.css';

function App() {
  const [input, setinput] = useState('');
  const [comment, setComment] = useState([
    {
      id: 1,
      display: 'hello',
      children: [
        {
          id: 2,
          display: 'awesome',
          children: [
            {
              id: 3,
              display: 'wake up',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      display: 'Keep grinding',
      children: [],
    },
  ]);
  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setinput(e.target.value);
  };
  const newComment = (text) => {
    return {
      id: new Date().getTime(),
      display: text,
      children: [],
    };
  };
  const handleNewComment = (e) => {
    if (input) {
      console.log('effsd');
      setComment([...comment, newComment(input)]);
      setinput('');
    }
  };

  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      handleNewComment();
    }
  };
  const addReply = (parentId, text) => {
    console.log('---App ---', parentId, text);
    const copyComments = [...comment];
    addComments(copyComments, parentId, text);
  };

  const addComments = (comments, parentId, text) => {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        console.log('-- found object', parentId, text);
        comment.children.unshift(newComment(text));
      }
    }
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      console.log('-- children -parentid', parentId);
      addComments(comment.children, parentId, text);
    }
  };

  return (
    <>
      <div className="App">
        <h1>Nested Comments</h1>
        {/* Input box */}
        <div>
          <input
            value={input}
            type="text"
            placeholder="Your Comment..."
            className="input-box"
            onChange={handleInputChange}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </div>

        {/* handle button */}
        <div>
          <button onClick={handleNewComment} className="comment-button">
            Comment
          </button>
        </div>

        {/* Nested comments  */}
        <div className="comments">
          {comment.map((item) => (
            <Comment key={item.id} comment={item} addReply={addReply} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
