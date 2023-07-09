import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentInput from "../../components/CommentInput/CommentInput";
import { getPost } from "../../api/posts";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import CommentCard from "../../components/CommentCard/CommentCard";

const Post = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { postId } = useParams();
  const [showEdit, setShowEdit] = useState(false);

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

  return (
    <div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <div>{post.title}</div>
          <div>{post.text}</div>
        </>
      )}

      {user ? (
        <CommentInput postId={postId} updatePost={updatePost} />
      ) : (
        <div>
          <h1>Norėdami komentuoti, prašome prisijungti.</h1>
        </div>
      )}

      {/* <Comments postId={postId} /> */}

      <div>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <>
            {comments.map((comment) => (
              <div key={comment._id}>
                <CommentCard
                  nickname={comment.nickname}
                  dateCreated={comment.dateCreated}
                  text={comment.text}
                />

                {user && user._id !== null && user._id === comment.userId && (
                  <div onClick={() => deleteComment(comment._id)}>X</div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
