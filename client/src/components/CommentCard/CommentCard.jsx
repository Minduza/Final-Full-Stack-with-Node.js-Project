import React from "react";
import "./CommentCard.scss";

const CommentCard = ({ nickname, dateCreated, text }) => {
  return (
    <div className="commentCard">
      <div className="commentHeader">
        <span>{nickname}</span>
        <span>{dateCreated}</span>
      </div>
      <div>{text}</div>
    </div>
  );
};

export default CommentCard;
