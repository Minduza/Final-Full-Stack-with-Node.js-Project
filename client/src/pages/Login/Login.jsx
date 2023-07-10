import { useState, useContext } from "react";
import MainLayout from "../../layout/MainLayout/MainLayout";
import FormItem from "../../components/FormItem/FormItem";
import "../Register/Register.scss";
import Button from "../../components/Button/Button";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { handleLogin, message, isLoggedIn, user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = { email, password };

  const loginHandler = (e) => {
    e.preventDefault();
    handleLogin(userLogin);
    console.log(isLoggedIn);
    console.log(user);
  };

  return (
    <MainLayout>
      <form className="registerForm" onSubmit={loginHandler}>
        <h1>Login</h1>
        <h2>{message}</h2>
        <FormItem
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <FormItem
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <Button className="lgBtn">Login</Button>
      </form>
    </MainLayout>
  );
};

export default Login;
