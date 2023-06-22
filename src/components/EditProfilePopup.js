import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  const currentUser = React.useContext(CurrentUserContext);
  
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      name = "profile"
      title = "Редактировать профиль"
      nameButtonSave = "Сохранить"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
      >
      <label className="popup__label">
        <input 
          id="name" type="text" className="popup__input" 
          name="name" minLength="2" maxLength="40" required 
          value={name} onChange={handleChangeName}
        />
        <span className="name-error"></span>
      </label>
      <label className="popup__label">
        <input 
          id="occupation" type="text" className="popup__input" 
          name="occupation" minLength="2" maxLength="200" required 
          value={description} onChange={handleChangeDescription}
        />
        <span className="occupation-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
