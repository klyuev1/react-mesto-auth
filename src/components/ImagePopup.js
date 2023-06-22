import React from 'react';

function ImagePopup(props) {
  return (
    <div className= {`popup popup_type_zoom ${props.card.link ? 'popup_opened' : ''}`}> 
        <div className="popup__card">
          <img className="popup__card-image" src={props.card.link} alt={props.card.name}/>
          <h3 className="popup__card-title">{props.card.name}</h3>
          <button type="button" className="popup__button-close popup__button-close_card" onClick={props.onClose}></button>
        </div>
      </div>
  );
}

export default ImagePopup;