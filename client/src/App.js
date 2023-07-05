import Providers from "./context/Providers";
import Login from "./pages/Login/Login";
import NewPost from "./pages/NewPost/NewPost";
import Routes from "./routes/Routes";
// import Register from "./pages/Register/Register";

const App = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
