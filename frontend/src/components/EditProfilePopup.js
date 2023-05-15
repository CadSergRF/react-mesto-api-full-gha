import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, onLoading }) => {

  const currentUser = useContext(CurrentUserContext);

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(currentUser)
  }, [currentUser, isOpen])

  function handleChange(event) { 
    const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value })) 
  } 

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="editProfile"
      title="Редактировать профиль"
      btnSubmitText={onLoading ? "Сохранить" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={values.name || ''}
        onChange={handleChange}
        className="popup__input popup__input_edit_name"
        type="text"
        placeholder="Ваше имя/ник"
        name="name"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__input-error editProfileName-error"></span>

      <input
        value={values.about || ''}
        onChange={handleChange}
        className="popup__input popup__input_edit_job"
        type="text"
        placeholder="Ваша должность"
        name="about"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__input-error editProFileJob-error"></span>

    </PopupWithForm>
  )
}

export default EditProfilePopup