import { useContext, useState } from "react";
import axios from "axios";
import { currentTime } from "../../utils/fullDate";

import { UserContext } from "../../context/UserContext";

const CommentInput = ({ postId }) => {
  const [text, setText] = useState("");

  const { user } = useContext(UserContext);

  const comment = {
    dateCreated: currentTime(),
    edited: false,
    postId: postId,
    userId: user._id,
    text,
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/posts/${postId}/answers`, comment)
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={commentSubmitHandler}>
      <textarea
        name="comment"
        id=""
        cols="30"
        rows="10"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      <button type="submit">Comment</button>
    </form>
  );
};

export default CommentInput;
