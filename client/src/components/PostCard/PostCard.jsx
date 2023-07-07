import "./PostCard.scss";
import { FaRegCommentAlt } from "react-icons/fa";

const PostCard = ({
  nickname,
  dateCreated,
  title,
  text,
  commentNumber,
  edited,
  onClick,
}) => {
  return (
    <div className="cardContainer" onClick={onClick}>
      <div className="postCardHeader">
        <span>Posted by {nickname}</span>
        <span> Date posted: {dateCreated}</span>
      </div>
      <div>
        <h2 className="postTitle">{title}</h2>
      </div>
      <div>
        <p className="postText">{text}</p>
      </div>
      <div className="postCardFooter">
        <FaRegCommentAlt /> {commentNumber} <span>comments</span>
      </div>
      <div>{edited ? <span>Edited</span> : ""}</div>
    </div>
  );
};

export default PostCard;
