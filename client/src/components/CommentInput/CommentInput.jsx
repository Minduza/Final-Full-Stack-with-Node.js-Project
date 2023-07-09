import { useContext, useState } from "react";
import axios from "axios";
import { currentTime } from "../../utils/fullDate";

import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const CommentInput = ({ postId, updatePost }) => {
  const [text, setText] = useState("");

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const comment = {
    dateCreated: currentTime(),
    edited: false,
    postId: postId,
    nickname: (user && user.nickname) || "",
    userId: (user && user._id) || "",
    text,
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/posts/${postId}/answers`, comment)

      .then(() => {
        updatePost(postId);
      })

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
