import React, { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, onLoading }) => {

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({});
  }, [isOpen])

  function handleChange(event) { 
    const { name, value } = event.target;
      setValues((prev) => ({ ...prev, [name]: value })) 
  } 

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="addPlace"
      title="Новое место"
      btnSubmitText={onLoading ? "Создать" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={values.name || ''}
        onChange={handleChange}
        className="popup__input popup__input_place_name"
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__input-error name-error"></span>

      <input
        value={values.link || ''}
        onChange={handleChange}
        className="popup__input popup__input_place_link"
        type="URL"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span className="popup__input-error link-error"></span>

    </PopupWithForm>
  )
}

export default AddPlacePopup