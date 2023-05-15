import React from 'react';
import { useEffect } from 'react';

const PopupWithForm = ({ name, title, btnSubmitText, isOpen, onClose, onSubmit, ...props }) => {

  useEffect(() => {
    if (!isOpen) return;
    
    function handleESC(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen, onClose]);

  
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={(evt) => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Кнопка закрытия модального окна"
          onClick={onClose}>
        </button>
        <h3 className="popup__title">{title}</h3>
        <form
          className="popup__form"
          name={`${name}`}
          onSubmit={onSubmit}
        >
          {props.children}
          <button className="popup__save-btn" type="submit" aria-label="Кнопка сохранить изменения">{btnSubmitText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm