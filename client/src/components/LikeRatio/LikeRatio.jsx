import { useState } from "react";
import axios from "axios";

const LikeDislikeComponent = ({ commentId, likes, dislikes }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [dislikeCount, setDislikeCount] = useState(dislikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const commentLikesUpdate = {
    likes: likeCount,
    dislikes: dislikeCount,
  };

  const editSubmit = async () => {
    try {
      await axios
        .patch(
          `http://localhost:3000/answers/${commentId}/likes`,
          commentLikesUpdate
        )
        .then((response) => console.log(response));
    } catch (error) {
      console.error(error);
    }
    console.log(commentId);
    console.log(likeCount);
    setTimeout(() => {
      console.log(likeCount);
    }, 2000);
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikeCount(dislikeCount - 1);
        setIsDisliked(false);
      }
      editSubmit();
    }
  };

  const handleDislike = () => {
    if (!isDisliked) {
      setDislikeCount(dislikeCount + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
      editSubmit();
    }
  };

  return (
    <div>
      <button onClick={handleLike} disabled={isLiked}>
        Like ({likeCount})
      </button>
      <button onClick={handleDislike} disabled={isDisliked}>
        Dislike ({dislikeCount})
      </button>
    </div>
  );
};

export default LikeDislikeComponent;
