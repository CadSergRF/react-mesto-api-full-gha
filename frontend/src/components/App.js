import Footer from './Footer';
import Header from './Header'
import Main from './Main'
import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as apiAuth from '../utils/apiAuth'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn && Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setUserEmail(userData.email);
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  },
    [isLoggedIn])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        console.log('Ошибка постановки лайка ' + err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log('Ошибка удаления карточки ' + err);
      });
  }

  function handleUpdateUser(userData) {
    api.editUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка обновления данных пользователя ' + err);
      });
  }

  function handleUpdateAvatar(link) {
    setIsEditAvatarPopupOpen(true);
    api.editUserAvatar(link)
      .then((newLink) => {
        setCurrentUser(newLink);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка обновления аватара' + err);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    setIsAddPlacePopupOpen(true);
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Ошибка добавления новой карточки' + err);
      });
  }

  const handleUserLogin = async (userLoginData) => {
    setLoading(true);
    try {
      const loginData = await apiAuth.authorize(userLoginData);
      if (loginData) {
        localStorage.setItem("jwt", loginData.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      }
    } catch (err) {
      setIsSuccess(false);
      setIsInfoToolTipOpen(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleUserRegister = async (userRegisterData) => {
    setLoading(true);
    try {
      const registerData = await apiAuth.register(userRegisterData);
      if (registerData) {
        setIsSuccess(true);
        setIsInfoToolTipOpen(true);
        navigate("sign-in", { replace: true });
      }
    } catch (err) {
      setIsSuccess(false);
      setIsInfoToolTipOpen(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const checkLogin = useCallback(async () => {
    try {
      const userCokkies = await apiAuth.checkCookies();
      setUserEmail(userCokkies.email);
      setIsLoggedIn(true);
      navigate("/", { replace: true })
    } catch (err) {
      console.error(err);
    }


  }, [navigate])

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  const handleUserSignOut = async () => {
    try {
      await apiAuth.logout();
      setLoading(false);
      setIsLoggedIn(false);
      setUserEmail("");
      navigate("/sign-in", { replace: true });
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userEmail={userEmail}
          onSignOut={handleUserSignOut}
        />

        <Routes>

          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={isLoggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />}
          />

          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleUserRegister}
                onLoading={isLoading}
              />}
          />

          <Route
            path="/sign-in"
            element={
              <Login
                onLogin={handleUserLogin}
                onLoading={isLoading}
              />}
          />

        </Routes>

        <Footer />

        {/* Модалка редактирование профиля */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isEditProfilePopupOpen}
        />

        {/* Модалка Изменение аватара */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isEditAvatarPopupOpen}
        />

        {/* Модалка Добавления контента */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isAddPlacePopupOpen}
        />

        {/* <!-- Попап "Подтверждение действия" --> */}
        <div className="popup" id="confirm-popup">
          <div className="popup__container">
            <button className="popup__close-btn" type="button" aria-label="Кнопка закрытия окна добавления контента"></button>
            <h3 className="popup__title">Вы уверенны?</h3>
            <form className="popup__form" name="confirmChanges">
              <button className="popup__save-btn" type="submit" aria-label="Кнопка сохранить изменения">Да</button>
            </form>
          </div>
        </div>

        {/* Модалка Увеличение картинки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;