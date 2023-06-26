import React from "react";
import logo from "../images/logo.svg";

function Header({ headerButton, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <div className='header__container'>
          {email}
          {headerButton}
      </div>
    </header>
  );
}

export default Header;
