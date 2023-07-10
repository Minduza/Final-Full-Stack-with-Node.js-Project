import Providers from "./context/Providers";
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
