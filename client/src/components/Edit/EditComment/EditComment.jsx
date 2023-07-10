import { useState } from "react";
import axios from "axios";
import TextareaItem from "../../TextareaItem/TextareaItem";
import Button from "../../Button/Button";
import { currentTime } from "../../../utils/fullDate";

const EditComment = ({
  textValue,
  id,
  deleteComment,
  updateComment,
  postId,
  handleEditClose,
  className,
}) => {
  const [editInput, setEditInput] = useState(textValue);

  const editedComment = {
    text: editInput,
    edited: true,
    dateCreated: currentTime(),
  };

  const editSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`http://localhost:3000/answers/${id}`, editedComment)
        .then(handleEditClose(false))
        .then(() => updateComment(postId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={editSubmit} className={className}>
      <TextareaItem
        rows="10"
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
      />

      <div className="btnsContainer">
        <div>
          <Button className="mdBtn" type="submit">
            Save
          </Button>
          <Button
            className="mdBtn"
            type="button"
            onClick={() => handleEditClose()}
          >
            Cancel
          </Button>
        </div>{" "}
        <Button className="btnDelete" onClick={() => deleteComment(id)}>
          Delete
        </Button>
      </div>
    </form>
  );
};

export default EditComment;
