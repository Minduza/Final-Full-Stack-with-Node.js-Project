import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import EditPost from "../Edit/EditPost/EditPost";
import { FaRegCommentAlt } from "react-icons/fa";
import "./PostCard.scss";
import Button from "../Button/Button";

const PostCard = ({
  nickname,
  dateCreated,
  title,
  text,
  commentNumber,
  edited,
  onClick,
  postId,
  userId,
}) => {
  const { user } = useContext(UserContext);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <div className="cardContainer">
        {showEdit ? (
          user &&
          user._id !== null &&
          user._id === userId && (
            <EditPost
              title={title}
              text={text}
              postId={postId}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
            />
          )
        ) : (
          <div className="postContent" onClick={onClick}>
            <div className="postCardHeader">
              <span>Posted by {nickname}</span>
              <span>
                {edited ? "Date edited:" : "Date created:"} {dateCreated}
              </span>
            </div>
            <div>
              <div>
                <h2 className="postTitle">{title}</h2>
              </div>
              <div>
                <p className="postText">{text}</p>
              </div>

              <div className="postCardFooter">
                <div>
                  <FaRegCommentAlt /> {commentNumber} <span>comments</span>
                </div>
                {user && user._id !== null && user._id === userId && (
                  <Button
                    className="smBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostCard;
