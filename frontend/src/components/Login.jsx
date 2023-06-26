import React from "react";
import Authorization from "./Authorization";
import Header from "./Header";
import { Link } from "react-router-dom";
import useForm from "./hooks/useForm";

function Login({ onLogin }) {
  const {formValue, handleChange} = useForm({
    email: "",
    password: ""
  })

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(formValue)
  }

  return (
    <>
      <Header headerButton={
        <Link
          to='/sign-up'
          className="button button_header"
        >Регистрация</Link>
      }
      />
      <Authorization
        title={"Вход"}
        buttonName={"Войти"}
        onSubmit={handleSubmit}
        idAuth={'form-log'}
        name={'log-auth'}
      >
        <input
          id="email"
          name="email"
          type="email"
          className="authorization__input"
          placeholder="Email"
          onChange={handleChange}
          value={formValue.email}
        />
        <input
          id="password"
          name="password"
          type="password"
          className="authorization__input"
          placeholder="Password"
          onChange={handleChange}
          value={formValue.password}
        />
      </Authorization>
    </>
  );
}

export default Login;
