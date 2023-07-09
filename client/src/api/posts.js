import axios from "axios";

export const getComments = async (postId) => {
  const response = await axios.get(
    `http://localhost:3000/posts/${postId}/answers`
  );
  return response.data;
};

export const getPost = async (postId) => {
  const response = await axios.get(`http://localhost:3000/posts/${postId}`);
  return response.data;
};
