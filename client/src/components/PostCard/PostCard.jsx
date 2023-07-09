import "./PostCard.scss";
import { FaRegCommentAlt } from "react-icons/fa";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

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
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPostText, setEditedPostText] = useState(text);
  const [showEdit, setShowEdit] = useState(false);

  const editedPost = {
    title: editedTitle,
    text: editedPostText,
    edited: true,
  };

  const { user } = useContext(UserContext);
  const deleteData = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userId);

  const editingPost = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:3000/posts/${postId}`, editedPost)
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      console.error(error);
    }
    setShowEdit(false);
  };

  const titleChangeHandler = (e) => {
    setEditedTitle(e.target.value);
    console.log(editedTitle);
  };

  return (
    <>
      <div className="cardContainer">
        {user && user._id !== null && user._id === userId && (
          <>
            {showEdit ? (
              <form onSubmit={editingPost}>
                <input
                  type="text"
                  required
                  value={editedTitle}
                  onChange={titleChangeHandler}
                />
                <textarea
                  rows="5"
                  cols="50"
                  type="text"
                  required
                  value={editedPostText}
                  onChange={(e) => setEditedPostText(e.target.value)}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={deleteData}>
                  Delete Post
                </button>
                <button type="button" onClick={() => setShowEdit(false)}>
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => {
                  setShowEdit(true);
                }}
              >
                Edit
              </button>
            )}
          </>
        )}
        <div className="postCardHeader">
          <span>Posted by {nickname}</span>
          <span> Date posted: {dateCreated}</span>
        </div>
        <div onClick={onClick}>
          <div>
            <h2 className="postTitle">{title}</h2>
          </div>
          <div>
            <p className="postText">{text}</p>
          </div>
        </div>

        <div className="postCardFooter">
          <FaRegCommentAlt /> {commentNumber} <span>comments</span>
        </div>
        <div>{edited ? <span>Edited</span> : ""}</div>
      </div>
    </>
  );
};

export default PostCard;
