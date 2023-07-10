import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NEW_POST_ROUTE,
  REGISTER_ROUTE,
} from "../../routes/const";
import "./Topbar.scss";

const Topbar = () => {
  const { isLoggedIn, handleLogout } = useContext(UserContext);

  return isLoggedIn ? (
    <div className="navContainer">
      <Link to={MAIN_ROUTE}>All Posts</Link>
      <Link to={NEW_POST_ROUTE}>Create Post</Link>
      <Link onClick={() => handleLogout()}>Logout</Link>
    </div>
  ) : (
    <div className="navContainer">
      <Link to={MAIN_ROUTE}>All Posts</Link>
      <Link to={LOGIN_ROUTE}>Login</Link>
      <Link to={REGISTER_ROUTE}>Register</Link>
    </div>
  );
};

export default Topbar;
