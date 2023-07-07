import { useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import RegisterLayout from "../../layout/RegisterLayout/RegisterLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  axios
    .get("http://localhost:3000/posts")
    .then((resp) => resp.data)
    .then((response) => {
      setPosts(response);
    })
    .catch((error) => {
      console.error(error);
    });

  const onclickHandler = (id) => navigate(`/posts/${id}`);

  return (
    <RegisterLayout>
      {posts.map((post, index) => (
        <PostCard
          key={index}
          onClick={() => onclickHandler(post._id)}
          nickname={post.nickname}
          dateCreated={post.dateCreated}
          title={post.title}
          text={post.text}
          commentNumber={post.comments.length}
          edited={post.edited}
        />
      ))}
    </RegisterLayout>
  );
};

export default Main;
