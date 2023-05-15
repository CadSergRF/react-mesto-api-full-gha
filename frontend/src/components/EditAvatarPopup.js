import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, onLoading }) => {

  const refEditAvatarLink = useRef();

  useEffect(() => {
    refEditAvatarLink.current.value = '';
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: refEditAvatarLink.current.value
    });
  }

  return (
    <PopupWithForm
      name="editAvatar"
      title="Обновить аватар"
      btnSubmitText={onLoading ? "Сохранить" : "Сохранение..."}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={refEditAvatarLink}
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

export default EditAvatarPopup