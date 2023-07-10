import { useState } from "react";
import axios from "axios";
import Input from "../../Input/Input";
import TextareaItem from "../../TextareaItem/TextareaItem";
import Button from "../../Button/Button";
import { currentTime } from "../../../utils/fullDate";

const EditPost = ({ postId, title, text, showEdit, setShowEdit }) => {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedPostText, setEditedPostText] = useState(text);

  const editedPost = {
    title: editedTitle,
    text: editedPostText,
    edited: true,
    dateCreated: currentTime(),
  };

  // Edit post
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

  // Delete post
  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {showEdit ? (
        <form onSubmit={editingPost}>
          <Input
            type="text"
            required
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextareaItem
            rows="10"
            cols="50"
            type="text"
            required
            value={editedPostText}
            onChange={(e) => setEditedPostText(e.target.value)}
          />
          <div className="btnsContainer">
            <div>
              <Button className="mdBtn" type="submit">
                Save
              </Button>
              <Button
                className="mdBtn"
                type="button"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </Button>
            </div>
            <Button className="btnDelete" type="button" onClick={deletePost}>
              Delete Post
            </Button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditPost;
