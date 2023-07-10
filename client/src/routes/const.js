import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Post from "../pages/Post/Post";
import NewPost from "../pages/NewPost/NewPost";
import Register from "../pages/Register/Register";
import LoginLayout from "../layout/LoginLayout";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const MAIN_ROUTE = "/";
export const NEW_POST_ROUTE = "/new_post";
export const POST_ROUTE = "/posts/:postId";

export const loginRoutes = {
  Layout: LoginLayout,
  routes: [
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: POST_ROUTE,
      Component: Post,
    },
  ],
};

export const authenticatedRoutes = {
  Layout: AuthenticatedLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: NEW_POST_ROUTE,
      Component: NewPost,
    },
    {
      path: POST_ROUTE,
      Component: Post,
    },
  ],
};
