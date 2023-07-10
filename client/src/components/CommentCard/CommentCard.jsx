import React from "react";
import "./CommentCard.scss";
import LikeRatioButton from "../LikeRatioButton/LikeRatioButton";

const CommentCard = ({
  className,
  nickname,
  likeCounter,
  userLikes,
  dateCreated,
  text,
  edited,
  id,
}) => {
  return (
    <div className={`${className} commentContainer`}>
      <LikeRatioButton
        likeCounter={likeCounter}
        userLikes={userLikes}
        commentId={id}
      />
      <div>
        <div className="commentHeader">
          <span>Commented by {nickname}</span>
          <span>
            {edited ? "Date Edited: " : "Date created: "}
            {dateCreated}
          </span>
        </div>
        <div className="commentBody">{text}</div>
      </div>
    </div>
  );
};

export default CommentCard;
