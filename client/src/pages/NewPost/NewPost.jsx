import { useState, useContext } from "react";
import FormItem from "../../components/FormItem/FormItem";
import MainLayout from "../../layout/MainLayout/MainLayout";
import Button from "../../components/Button/Button";
import axios from "axios";
import { currentTime } from "../../utils/fullDate";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import TextareaItem from "../../components/TextareaItem/TextareaItem";
import "./NewPost.scss";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const post = {
      title,
      text,
      dateCreated: currentTime(),
      userId: user._id,
      nickname: user.nickname,
      edited: false,
    };

    axios
      .post("http://localhost:3000/posts", post)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <MainLayout>
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <h2>CREATE NEW POST</h2>
        <FormItem
          maxlength="100"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter post title here..."
          required
        />
        <div>
          <TextareaItem
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Enter post text here..."
            maxlength="2000"
            rows="10"
            required
          />
        </div>
        <div className="btnsContainer">
          <Button className="mdBtn">Post</Button>
          <Button className="mdBtn" onClick={() => navigate("/")}>
            Cancel
          </Button>
        </div>
      </form>
    </MainLayout>
  );
};

export default NewPost;
