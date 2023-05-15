import React from 'react';
import { useEffect } from 'react';

const ImagePopup = ({ card, onClose, isOpen }) => {

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
    className={`popup popup_big-image_bgc  ${card?.link ? "popup_opened" : ""}`} id="enhance-image"
    onMouseDown={(evt) => evt.target === evt.currentTarget && onClose()}
    >
      <div className="popup__image-container">
        <img src={card?.link} alt={card?.name} className="popup__image-big" />
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Кнопка закрытия окна добавления контента"
          onClick={onClose}
        ></button>
        <h3 className="popup__image-title">{card?.name}</h3>
      </div>
    </div>
  )
}

export default ImagePopup