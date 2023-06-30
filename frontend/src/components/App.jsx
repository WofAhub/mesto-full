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
import Api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from '../utils/auth.js';
import ProtectedRoute from "./ProtectedRoute";
import { BASE_URL } from '../utils/auth';

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
  const [apiState, setApiState] = React.useState({});

  // const авторизация
  const [isloggedIn, setLoggedIn] = React.useState(false);
  // const [token, setToken] = React.useState('')
  const [userData, setUserData] = React.useState('')
  const [isSuccess, setIsSuccess] = React.useState(false);
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   setToken(jwt);
  //   console.log(jwt, "Это token в React.useEffect(() 1, в App");
  // }, []);

  React.useEffect(() => {
    if (Object.keys(apiState).length > 0) {
        Api.getCurrentUser()
            .then(user => {
                if (user) {
                    setCurrentUser(user);
                }
            })
            .catch(err => { console.log(err) });
    }
}, [apiState]);

React.useEffect(() => {
    if (Object.keys(apiState).length > 0) {
        Api.getInitialCards()
            .then(cards => {
                setCards(cards.reverse());
            })
            .catch(err => { console.log(err) });
    }
}, [apiState]);

  // получить контент
  // React.useEffect(() => {
  //   if (!token) {
  //     return;
  //   }
  //   auth
  //     .getContent(token)
  //     .then((res) => {
  //       setUserData(res.data.email);
  //       setLoggedIn(true);
  //       navigate('/', { replace: true });
  //     })
  //     .catch((err) => {
  //       console.log(`Ошибка в App, useEffect2: ${err}`);
  //     })
  // }, [navigate, token])

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        auth.getContent(jwt)
            .then(res => {
                setLoggedIn(true);
                setUserData(res.email);
                setApiState(new Api({
                    baseUrl: BASE_URL,
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json'
                    }
                }));
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            })
    }
}, [navigate]);

  // регистрация
  function registerUser({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if(res) {
        setIsSuccess(true);
        navigate('/sign-in', { replace: true });
        } else {
          setIsSuccess(false);
        }
      })
      .catch((err) => {
        console.log(`Ошибка в App, registerUser: ${err}`);
      });
  }

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
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setUserData(email);
        setLoggedIn(true);
        navigate('/', { replace: true });
        setApiState(new Api({
          fetchUrl: BASE_URL,
          headers: {
            authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
          }
        }))
      })
      .catch((err) => {
        console.log(`Ошибка в App, loginUser: ${err}`);
      });
  }

  // разлогин
  function logOutUser() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setApiState({});
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
    Api
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
    Api
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
    Api
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

    Api
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
    Api
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