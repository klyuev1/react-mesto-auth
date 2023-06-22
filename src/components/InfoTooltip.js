import React from 'react';

function InfoTooltip({name, isOpen, onClose, title, icon}) {
  return (
    <div className = {`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__container">
        <div className="popup__form">
        <img className="popup__logo-auth" src={icon} />
        <h2 className="popup__text-auth">{title}</h2>
        <button type="button" className="popup__button-close" onClick={onClose} />
      </div>
      </div>
    </div>
  );
}

export default InfoTooltip;