import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import NewPost from "../pages/NewPost/NewPost";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import LoginLayout from "../layout/LoginLayout";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const MAIN_ROUTE = "/";
export const PROFILE_ROUTE = "/profile";
export const POST_ROUTE = "/new_post";

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
      path: PROFILE_ROUTE,
      Component: Profile,
    },
    {
      path: POST_ROUTE,
      Component: NewPost,
    },
  ],
};
