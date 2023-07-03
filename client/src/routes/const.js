import Login from "../pages/Login/Login";
import Main from "../pages/Main/Main";
import Post from "../pages/Post/Post";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const MAIN_ROUTE = "/";
export const PROFILE_ROUTE = "/profile";
export const POST_ROUTE = "/post";

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
      Component: Post,
    },
  ],
};
