import { useState, useContext } from "react";
import FormItem from "../../components/FormItem/FormItem";
import RegisterLayout from "../../layout/RegisterLayout/RegisterLayout";
import Button from "../../components/Button/Button";
import axios from "axios";
import { currentTime } from "../../utils/fullDate";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

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
    <RegisterLayout>
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <FormItem
          label="title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <div>
          <textarea
            rows="5"
            cols="50"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <Button className="btnReg">Post</Button>
      </form>
    </RegisterLayout>
  );
};

export default NewPost;
