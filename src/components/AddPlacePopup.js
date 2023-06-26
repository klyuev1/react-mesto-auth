import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]); // Сбросить поля

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateCard({
      name: name,
      link: link
    });
  } 
    
  return (
    <PopupWithForm 
      name = "card"
      title = "Новое место"
      nameButtonSave = {props.isLoading? 'Создание...' : 'Создать'}
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit={handleSubmit}
      >
      <label className="popup__label">
        <input 
          id="title" type="text" className="popup__input"
          name="title" placeholder="Название" minLength="2" maxLength="30" required
          value={name} onChange={handleChangeName}
        />
        <span className="title-error"></span>
      </label>
      <label className="popup__label">
        <input 
          id="link" type="url" className="popup__input"
          name="link" placeholder="Ссылка на картинку" required
          value={link} onChange={handleChangeLink}
        />
        <span className="link-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
