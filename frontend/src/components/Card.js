import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'


const Card = ({ cardData, onCardClick, onCardDelete, onCardLike }) => {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = cardData.owner._id === currentUser._id;
  const isLiked = cardData.likes.some(i => i._id === currentUser._id);

  function handleLikeClick() {
    onCardLike(cardData)
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
  }

  function handleClick() {
    onCardClick(cardData);
  }

  return (
    <li className="places__item">
      <article className="place">
        <img
          className="place__image"
          src={cardData.link}
          alt={cardData.name}
          onClick={handleClick}
        />
        {isOwn && <button type="button" aria-label="Кнопка удаления place" className="place__delete" onClick={handleDeleteClick} />}
        <div className="place__info">
          <h2 className="place__title">{cardData.name}</h2>
          <div>
            <button
              type="button"
              aria-label="Кнопка лайк"
              className={`place__like ${isLiked && 'place__like_active'}`}
              onClick={handleLikeClick}>
            </button>
            <p className="place__num-of-likes">{cardData.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  )
}

export default Card