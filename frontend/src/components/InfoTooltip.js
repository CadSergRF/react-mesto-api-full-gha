import React from 'react';
import successImage from '../img/success.svg';
import unsuccessImage from '../img/unsuccess.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={(evt) => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <img className="popup__signup-image" src={`${isSuccess ? successImage : unsuccessImage}`} alt="" />
        <h2 className="popup__signup-title">{`${isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;