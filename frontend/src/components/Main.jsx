import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";

function Main({
  cards,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onAddPlace,
  logOut,
  userData
}) {
  const currentUserContext = React.useContext(CurrentUserContext)

  return (
    <>
      <Header
        email={
          <p className='header__user-email'>{userData}</p>
        }
        headerButton={
          <button
            type='button'
            onClick={logOut}
            className="button button_header button_header_main"
          >
            Выход
          </button>
        }
      />
      <main className="content">
        <section className="profile">

          <img
            className="profile__avatar"
            src={currentUserContext.avatar}
            alt="аватар"
          />

          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}>
          </button>

          <div className="profile__info">
            <h1 className="profile__name">{currentUserContext.name}</h1>
            <p className="profile__description">{currentUserContext.about}</p>
            <button
              className="button button_type_edit-button"
              type="button"
              onClick={onEditProfile}>
            </button>
          </div>

          <button
            className="button button_type_add-button"
            type="button"
            onClick={onAddPlace}>
          </button>

        </section>

        <section className="elements">
          {
            cards.map(card => {
              return (
                <Card 
                  key={card._id} 
                  card={card} 
                  onCardClick={onCardClick} 
                  onCardLike={onCardLike} 
                  onCardDelete={onCardDelete} 
                />
              )
            })
          }
        </section>
        <Footer />
      </main>
    </>
  )
}

export default Main;