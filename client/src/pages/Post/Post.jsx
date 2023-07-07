import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentInput from "../../components/CommentInput/CommentInput";

const Post = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const { postId } = useParams();

  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(`http://localhost:3000/posts/${postId}`)
      .then((resp) => resp.data)
      .then((response) => {
        setPost(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }, [postId]);

  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(`http://localhost:3000/posts/${postId}/answers`)
      .then((resp) => resp.data)
      .then((response) => {
        setComments(response);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // setIsLoading(false);
      });
  }, [postId]);

  console.log(comments);

  return (
    <div>
      <div>{post.title}</div>
      <div>{post.text}</div>
      <CommentInput postId={postId} />

      {comments.map((comment) => (
        <div key={comment._id}>{comment.text}</div>
      ))}
    </div>
  );
};

export default Post;
