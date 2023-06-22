import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js'

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext); // Подписка на глобальный стейт
  const isOwn = props.card.owner._id === currentUser._id; // Наличие кнопки delete
  
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  ); // Наличие лайка и его отрисовка

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      {isOwn && <button type="button" className="element__remove" onClick={handleDelete}></button>}
      <button type="button" className="element__image-button" onClick={handleClick}>
        <img className="element__image" alt={props.card.name} src={props.card.link}/>
      </button>
      <div className="element__sign">
        <h3 className="element__title">{props.card.name}</h3>
        <div className="element__like-block">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLike}></button>
          <p className="element__like-text">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;