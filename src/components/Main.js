import React from 'react'
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js'


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext); // Подписка на глобальный стейт

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__section">
          <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" alt="Аватар человека" src={currentUser.avatar}/>
          </button>
          <div className="profile__info">
            <div className="profile__title-block">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button type="button" className="profile__button-edit" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button type="button" className="profile__button-add" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards.map(card => ( // cards подтягиваем из App
          <Card 
            key={card._id} 
            card={card} 
            onCardClick={props.onCardClick} // Обновление стейта карточки
            onCardLike={props.onCardLike} 
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;