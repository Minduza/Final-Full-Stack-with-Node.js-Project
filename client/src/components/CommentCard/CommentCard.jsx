import React from "react";
import "./CommentCard.scss";
import LikeDislikeComponent from "../LikeRatio/LikeRatio";

const CommentCard = ({
  className,
  nickname,
  likes,
  dislikes,
  dateCreated,
  text,
  edited,
  id,
  postId,
}) => {
  return (
    <div className={className}>
      <LikeDislikeComponent
        likes={likes}
        dislikes={dislikes}
        commentId={id}
        postId={postId}
      />
      <div className="commentHeader">
        <span>Commented by {nickname}</span>
        <span>
          {edited ? "Date Edited: " : "Date created: "}
          {dateCreated}
        </span>
      </div>
      <div className="commentBody">{text}</div>
    </div>
  );
};

export default CommentCard;
