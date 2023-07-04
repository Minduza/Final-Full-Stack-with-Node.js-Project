import React, { useState } from "react";
import RegisterLayout from "../../layout/RegisterLayout/RegisterLayout";
import FormItem from "../../components/FormItem/FormItem";
import "../Register/Register.scss";
import Button from "../../components/Button/Button";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const user = { email, password };

  const loginHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/login", user)
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <RegisterLayout>
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
        <Button className="btnReg">Login</Button>
      </form>
    </RegisterLayout>
  );
};

export default Login;
