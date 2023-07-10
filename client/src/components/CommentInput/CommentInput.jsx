import { useContext, useState } from "react";
import axios from "axios";
import { currentTime } from "../../utils/fullDate";
import { UserContext } from "../../context/UserContext";
import TextareaItem from "../TextareaItem/TextareaItem";
import "./CommentInput.scss";
import Button from "../Button/Button";

const CommentInput = ({ postId, updatePost, placeholder }) => {
  const [text, setText] = useState("");
  const { user } = useContext(UserContext);

  const comment = {
    dateCreated: currentTime(),
    edited: false,
    postId: postId,
    nickname: (user && user.nickname) || "",
    userId: (user && user._id) || "",
    text,
    likes: 0,
    dislikes: 0,
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/posts/${postId}/answers`, comment)
      .then(() => {
        updatePost(postId);
      })
      .then(() => setText(""))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={commentSubmitHandler} className="inputContainer">
      <TextareaItem
        placeholder={placeholder}
        rows="10"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></TextareaItem>
      <Button className="mdBtn" type="submit">
        Comment
      </Button>
    </form>
  );
};

export default CommentInput;
