import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from '../components/EditProfilePopup.js';
import EditAvatarPopup from '../components/EditAvatarPopup.js';
import AddPlacePopup from '../components/AddPlacePopup.js';
// Новые импорты
import { Routes, Route, useNavigate} from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/auth.js';
import truth from '../images/thurh.svg';
import fail from '../images/fail.svg';


function App() {
  // Стейты и хуки
  // Поднятие карточек и данных о профиле с сервера
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  // Защищенный роут. Стейт изменения статуса
  const [loggedIn, setLoggedIn] = React.useState(false);
  // Стейты изменения данных InfoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [titleInfo, setTitleInfo] = React.useState("");
  const [iconInfo, setIconInfo] = React.useState("");
  // Стейты попапов и функции их открытия + закрытие
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  //---
  
  // React.useEffect. Загружаем данные пользователя и проверяем наличие токена
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((res) => {
      const [userData, cardsData] = res;
        setCurrentUser(userData);
        setCards(cardsData);
    })
    .catch((err) => {
      console.log(err);
    });
    tokenCheck();
  },[email]);
  //---
  
  // Auth.metods
  // Функция сабмита регистрации. Отрисовка попапа. Прокидывание в sign-in
  function handleRegister(email, password) {
    setIsLoading(true);
    auth.register(email, password)
    .then(() =>{
      setTitleInfo("Вы успешно зарегистрировались!");
      setIconInfo(truth);
      navigate('/sign-in', {replace: true});
    })
    .catch(() => {
      setTitleInfo("Что-то пошло не так! Попробуйте ещё раз.");
      setIconInfo(fail);
    })
    .finally(() =>{
      handleInfoTooltipClick();
      setIsLoading(false);
    })
  }

  // Функция сабмита логина. Отрисовка попапа. Прокидывание в защищенный роут
  function handleLogin(email, password) {
    setIsLoading(true);
    auth.authorize(email, password)
      .then((data) => {
        if (data){
          setLoggedIn(true);
          setTitleInfo("Вы успешно авторизировались!");
          setIconInfo(truth);
          localStorage.setItem('jwt', data.token);
          navigate('/', {replace:true});
          return data;
        }
      })
      .catch(() => {
        setTitleInfo("Что-то пошло не так! Попробуйте ещё раз.");
        setIconInfo(fail);
      })
      .finally(() =>{
        handleInfoTooltipClick();
        setIsLoading(false);
      })
  }

  // Функция проверки токена
  function tokenCheck() {
      const jwt = localStorage.getItem("jwt");
    if (jwt){
      // проверим токен
      auth.getContent(jwt)
      .then((res) => {
        if (res){
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/", {replace: true});
        }
      })
      .catch((err) => console.log(err));
    }
  }
  
  // Функция выхода из аккаунта
  function signOut(){
    localStorage.removeItem('jwt');
    navigate("/sign-up");
  }
  //---

  // Функции открытия попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }
  
  // Закрытие попапов по клавише esc
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);
  //---

  // Обработчики
  // Обработчик лайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  }

  // Обработчик удаления карточки
  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  // Обработчик изменения профиля (в инпут попадают данные из попапа)
  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api.patchUserInfo(name, about)
    .then((data) => {
      setCurrentUser(data);
    })
    .then(() => closeAllPopups())
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }
  
  // Обработчик изменения аватара (в инпут попадают данные из попапа)
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.patchAvatar(avatar)
    .then((data) => {
      setCurrentUser(data);
    })
    .then(() => closeAllPopups())
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }

  // Обработчик добавления карточки (в инпут попадают данные из попапа)
  function handleAddPlaceSubmit(name, link) {
    setIsLoading(true);
    api.postNewCard(name, link)
    .then((newCard) => setCards([newCard, ...cards]))
    .then(() => closeAllPopups())
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false));
  }
  //---

  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
        <Routes>

          <Route path="/sign-up" element={
            <>
              <Header/>
              <Register
                title="Регистрация"
                nameButtonSubmit={isLoading? 'Регистрация...' : 'Зарегистрироваться'}
                nameLink="Уже зарегистрированы? Войти"
                onRegister={handleRegister}
                
              />
            </>
          }/>

          <Route path="/sign-in" element={
            <>
              <Header/>
              <Login
                title="Вход"
                nameButtonSubmit={isLoading? 'Вход...' : 'Войти'}
                onLogin={handleLogin}

              />
            </>
          }/>
          
          <Route path="/" element={
            <>
              <Header
                email={email}
                OnOut={signOut}
              />
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onCardLike={handleCardLike}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </>
            
          }/>
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser = {handleUpdateUser}
          isLoading = {isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading = {isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleAddPlaceSubmit}
          isLoading = {isLoading}
        />

        <PopupWithForm
          name = "delete"
          title = "Вы уверены?"
          nameButtonSave = {isLoading? 'Сохранение...' : 'Да'}
        />

        <ImagePopup 
          card={selectedCard} 
          onClose = {closeAllPopups}
        />

        <InfoTooltip
          name="auth"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={titleInfo}
          icon={iconInfo}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;