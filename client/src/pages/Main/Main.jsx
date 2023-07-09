import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import RegisterLayout from "../../layout/RegisterLayout/RegisterLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/posts")
      .then((resp) => resp.data)
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onclickHandler = (id) => navigate(`/posts/${id}`);

  return (
    <RegisterLayout>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        posts.map((post, index) => (
          <PostCard
            key={index}
            onClick={() => onclickHandler(post._id)}
            nickname={post.nickname}
            dateCreated={post.dateCreated}
            title={post.title}
            text={post.text}
            commentNumber={post.comments.length}
            edited={post.edited}
            postId={post._id}
            userId={post.usersId}
          />
        ))
      )}
    </RegisterLayout>
  );
};
export default Main;
