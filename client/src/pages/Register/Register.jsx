import React, { useEffect, useState } from "react";
import FormItem from "../../components/FormItem/FormItem";
import Button from "../../components/Button/Button";
import axios from "axios";
import MainLayout from "../../layout/MainLayout/MainLayout";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../routes/const";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPsw, setRepeatPsw] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((resp) => resp.data)
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(users.find((user) => user.email === email));
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const user = {
      name,
      surname,
      nickname,
      birthDate,
      email,
      password,
    };

    // Validation
    if (
      password === repeatPsw &&
      !users.find((user) => user.email === email) &&
      !users.find((user) => user.nickname === nickname)
    ) {
      setMessage("");
      axios
        .post("http://localhost:3000/users", user)
        .then(navigate(LOGIN_ROUTE))
        .catch((error) => {
          console.error(error);
        });
    } else if (password !== repeatPsw) {
      setMessage("Passwords don't match");
    } else if (users.find((user) => user.email === email)) {
      setMessage("This email already exists");
    } else if (users.find((user) => user.nickname === nickname)) {
      setMessage("This nickname is already taken");
    }
  };

  return (
    <MainLayout>
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <h1>Register</h1>
        <span className="redMessage">{message}</span>
        <FormItem
          label="Name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
        />
        <FormItem
          label="Surname"
          type="text"
          value={surname}
          onChange={(e) => {
            setSurname(e.target.value);
          }}
          required
        />
        <FormItem
          minlength="2"
          maxlength="15"
          label="Nickname"
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          required
        />
        <FormItem
          label="Birth date"
          type="date"
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value);
          }}
          required
        />
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
          minlength="6"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <FormItem
          minlength="6"
          label="Repeat Password"
          type="password"
          value={repeatPsw}
          onChange={(e) => {
            setRepeatPsw(e.target.value);
          }}
          required
        />
        <Button className="lgBtn">REGISTER</Button>
      </form>
    </MainLayout>
  );
};

export default Register;
