import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentInput from "../../components/CommentInput/CommentInput";
import { getPost } from "../../api/posts";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import MainLayout from "../../layout/MainLayout/MainLayout";
import "../../components/PostCard/PostCard.scss";
import Comments from "../../components/Comments/Comments";

const Post = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  const { user } = useContext(UserContext);

  const updatePost = async () => {
    await axios
      .get(`http://localhost:3000/posts/${postId}`)
      .then((resp) => resp.data)
      .then((response) => {
        setPost(response[0]);
        setComments(response[0].comments);
      });
  };

  const updateComment = async (id) => {
    await axios
      .get(`http://localhost:3000/posts/${id}/answers`)
      .then((resp) => resp.data)
      .then((response) => {
        setComments(response);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getPost(postId)
      .then((response) => {
        setPost(response[0]);
        setComments(response[0].comments);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);

  const deleteComment = async (commentId) => {
    try {
      await axios
        .delete(`http://localhost:3000/answers/${commentId}`)
        .then(() => updatePost());
    } catch (error) {
      console.error(error);
    }
  };

  console.log(post.usersId);
  return (
    <MainLayout>
      <div className="cardContainer">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            <h2>{post.title}</h2>
            <div>{post.text}</div>
          </>
        )}
        {user ? (
          <CommentInput
            postId={postId}
            updatePost={updatePost}
            placeholder="Enter your answer here..."
          />
        ) : (
          <div>
            <h2>Please login to comment.</h2>
          </div>
        )}
      </div>

      <Comments
        isLoading={isLoading}
        comments={comments}
        updateComment={updateComment}
        deleteComment={deleteComment}
        postId={postId}
      />
    </MainLayout>
  );
};

export default Post;
