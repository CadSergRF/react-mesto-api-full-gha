import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo.svg';

const Header = ({userEmail, onSignOut}) => {
  const location = useLocation();

  return (
    <header className="header root__container">
      <img className="logo header__logo" src={logo} alt="Логотип" />
      {location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {location.pathname === '/' && (
        <nav className="header__nav">
          <p className="header__email">{userEmail}</p>
          <button className="header__sign-out" onClick={() => onSignOut()}>Выйти</button>
        </nav>
      )}
    </header>
  )
}

export default Header