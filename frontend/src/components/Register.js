import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onRegister, onLoading }) => {
  const [values, setValues] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <div className='auth root__container'>
      <div className='auth__container'>
        <form
          className='auth__form'
          onSubmit={handleSubmit}
        >
          <h3 className='auth__form-title'>Регистраия</h3>
          <div className='auth__form-input-area'>
            <input
              value={values.email || ''}
              onChange={handleChange}
              className="auth__form-input"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <span className="auth__form-input-error"></span>
            <input
              value={values.password || ''}
              onChange={handleChange}
              className="auth__form-input"
              type="password"
              placeholder="Пароль"
              name="password"
              required
            />
            <span className="auth__form-input-error"></span>
          </div>
          <div>
            <button className="auth__form-btn" type="submit" aria-label="Логин">
              {onLoading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
            <div className="auth__singin">
              <p className="auth__signin-text">Уже зарегистрированы?</p>
              <Link to="/sign-in" className="auth__signin-link">Войти</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

}

export default Login