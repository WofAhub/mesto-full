import React from "react";
import { Link } from "react-router-dom";
import Authorization from "./Authorization";
import Header from "./Header";
import useForm from "./hooks/useForm";

function Register({onRegister, onInfoTooltipClick}) {
  const {formValue, handleChange} = useForm({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue);
    onInfoTooltipClick()
  } 

  return (
    <>
      <Header 
        headerButton={
          <Link 
            to='/sign-in'
            className="button button_header"
          >
            Вход
          </Link>} 
      />
      <Authorization
        title={"Регистрация"}
        buttonName={"Зарегистрироваться"}
        onSubmit={handleSubmit}
        registerChildren={
          <div className="register">
            <p className="register__already-registered">
              Уже зарегистрированы?
            </p>
            <Link
              to="/sign-in"
              type="button"
              className="button button_type_register"
            >
              Войти
            </Link>
          </div>
        }
        idAuth={'form-reg'}
        name={'reg-auth'}
      >
        <input
          id="email"
          name="email"
          type="email"
          className="authorization__input"
          placeholder="Email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          className="authorization__input"
          placeholder="Password"
          value={formValue.password}
          onChange={handleChange}
          required
        />
      </Authorization>
    </>
  );
}

export default Register;
