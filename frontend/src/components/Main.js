import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Main = ({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="root__container">
      {/* <!-- профиль пользователя --> */}
      <section className="user-profile root__user-profile">
        <div className="user-profile__avatar-wrapper" onClick={onEditAvatar}>
          <img className="user-profile__photo" alt="Аватар" src={currentUser.avatar} />
        </div>
        <div className="user-profile__info-wrapper">
          <h1 className="user-profile__name">{currentUser.name}</h1>
          <button
            className="user-profile__edit"
            type="button"
            aria-label="Кнопка редактирования профиля"
            onClick={onEditProfile}>
          </button>
          <p className="user-profile__job">{currentUser.about}</p>
        </div>
        <button
          className="user-profile__add-place"
          type="button"
          aria-label="Кнопка добавления контента"
          onClick={onAddPlace}>
        </button>
      </section>
      {/* <!-- Секция контента --> */}
      <section className="places" aria-label="Фотографии">
        <ul className="places__list">
          {
            cards.map((cardData) => (
              <Card
                cardData={cardData}
                key={cardData._id}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            ))
          }
        </ul>
      </section>

    </main>
  )
}

export default Main