// components
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

// components-authorization
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

// react and utils
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import React from "react";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from '../utils/auth.js';
import ProtectedRoute from "./ProtectedRoute";

// function App
function App() {

  // const попапы
  const [isEditAvatarPopupOpen, isSetEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, isSetEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, isSetAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, isSetInfoTooltipPopupOpen] = React.useState(false);

  // const api
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // const авторизация
  const [isloggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState('')
  const [isSuccess, setIsSuccess] = React.useState(false);

  // const навигация
  const navigate = useNavigate();

  // проверка токена
  function checkToken() {
    const token = localStorage.getItem('token');
  
    if (token) {
      auth
      .checkToken(token)
      .then((res) => {
        if (res.data) {
          setUserData(res.data.email);
          setLoggedIn(true);
          navigate('/', {replace: true});
        }
      })
      .catch((err) => {
        console.log(`Ошибка в checkToken, в App: ${err.status}`);
      });
    }    
  }
  
    React.useEffect(() => {
      checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  // регистрация
  function registerUser({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        console.log(res, "Это res из register в App.jsx")
        setIsSuccess(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(`Ошибка в регистрации, в App: ${err}`)
      })
  };

  // вспылывающий попап в случае (не)удачной регистрации
  React.useEffect(() => {
    if (isInfoTooltipPopupOpen && isSuccess) {
      setTimeout(() => {
        closeAllPopups();
      }, 1200);

      setTimeout(() => {
        setIsSuccess(false);
      }, 1500);
    };

    return () => clearTimeout(setTimeout);
  }, [isInfoTooltipPopupOpen, isSuccess, closeAllPopups, setIsSuccess]);

  // логин
  function loginUser({ email, password }) {
    auth
      .login(email, password)
      .then((data) => {
        if(data.token) {
        console.log(data, "Это res из login в App.jsx")
        setUserData(email);
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        isSetInfoTooltipPopupOpen(true);
        console.log(`Ошибка в App, loginUser: ${err}`);
      });
  }

  // получаю пользователя
  React.useEffect(() => {
    if (isloggedIn) {
      api.getCurrentUser()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [isloggedIn]);

  // получаю карточки
  React.useEffect(() => {
    if (isloggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data.reverse());
        })
        .catch((err) => {
          console.log(`Ошибка: ${err.status}`);
        });
    }
  }, [isloggedIn]);

  // разлогин
  function logOutUser() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserData("");
    navigate('/sign-in', { replace: true });
  }

  // попап информации о регистрации
  function handleInfoTooltipPopupClick() {
    isSetInfoTooltipPopupOpen(true)
  }

  // смена аватара
  function handleEditAvatarClick() {
    isSetEditAvatarPopupOpen(true);
  }

  // смена имени и описания
  function handleEditProfileClick() {
    isSetEditProfilePopupOpen(true);
  }

  // добавление карточки
  function handleAddPlaceClick() {
    isSetAddPlacePopupOpen(true);
  }

  // нажатие по карточке
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function closeAllPopups() {
    isSetEditAvatarPopupOpen(false);
    isSetEditProfilePopupOpen(false);
    isSetAddPlacePopupOpen(false);
    isSetInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  // закрыть все попапы
  function closeAllPopupsByClickAndOverlay(evt) {
    if (evt.target.classList.contains('pop-up_type_overlay')) {
      closeAllPopups();
    } else if(evt.target.classList.contains('button_type_close-button')) {
      closeAllPopups();
    }
  }

  // запрос обновления информации юзера
  function handleUpdateUser(data) {
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в App, handleUpdateUser: ${err}`);
      });
  }

  // запрос обновления аватара
  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в App, handleUpdateAvatar: ${err}`);
      });
  }

  // запрос добавления карточки
  function handleAddPlace(data) {
    api
      .createCardByPopup(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в App, handleAddPlace: ${err}`);
      });
  }

  // запрос обновления лайков
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка в App, handleCardLike: ${err}`);
      });
  }

  // запрос удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка в App, handleCardDelete: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser || ""}>
        <div className="root">
          <div className="page">
            <Routes>
              <Route
                path="/sign-in"
                element={
                  <Login
                    onLogin={loginUser}
                  />}
              />
              <Route
                path="/sign-up"
                element={
                  <Register
                    onRegister={registerUser}
                    onInfoTooltipClick={handleInfoTooltipPopupClick}
                  />}
              />
              <Route
                path="*"
                element={
                  isloggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/sign-up" replace />
                  )
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    loggedIn={isloggedIn}
                    element=
                    {Main}
                    cards={cards}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    logOut={logOutUser}
                    userData={userData}
                  />
                }
              />
            </Routes>

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopupsByClickAndOverlay}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopupsByClickAndOverlay}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopupsByClickAndOverlay}
              onAddPlace={handleAddPlace}
            />
            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopupsByClickAndOverlay}
            />
            <InfoTooltip
              isOpen={isInfoTooltipPopupOpen}
              onClose={closeAllPopupsByClickAndOverlay}
              isSuccess={isSuccess}
            />
          </div>
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;