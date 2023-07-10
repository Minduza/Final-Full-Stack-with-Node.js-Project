import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard/PostCard";
import MainLayout from "../../layout/MainLayout/MainLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sort from "../../components/Sort/Sort";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortDate, setSortDate] = useState("");
  const [filterComments, setFiltetComments] = useState(false);
  const [sortByAmountAsc, setSortByAscAmountAsc] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/posts?sortDate=${sortDate}`)
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
  }, [sortDate]);

  const onclickHandler = (id) => navigate(`/posts/${id}`);

  const notAnsweredPosts = posts.filter((post) => post.comments.length === 0);
  const sortedPosts = filterComments ? notAnsweredPosts : posts;
  if (sortByAmountAsc) {
    sortedPosts.sort((a, b) => b.comments.length - a.comments.length);
  }

  return (
    <MainLayout>
      <Sort
        setSortDate={setSortDate}
        setFiltetComments={setFiltetComments}
        setSortByAscAmountAsc={setSortByAscAmountAsc}
      />
      {isLoading ? (
        <div>Loading</div>
      ) : (
        sortedPosts.map((post, index) => (
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
    </MainLayout>
  );
};
export default Main;
