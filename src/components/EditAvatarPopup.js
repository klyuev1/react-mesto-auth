import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm 
      name = "avatar"
      title = "Обновить аватар"
      nameButtonSave = "Сохранить"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit={handleSubmit}
      >
      <label className="popup__label">
        <input
          id="avatar" type="url" className="popup__input"
          name="avatar" placeholder="Ссылка на картинку" required
          ref={avatarRef}
        />
        <span className="avatar-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;