import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card ({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUserContext = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUserContext._id;
  const isLiked = card.likes.some(i => i._id === currentUserContext._id);
  const cardLikeButtonClassName = ( 
    `button button_type_like-button ${isLiked && 'button_type_liked-button'}`
  );

  const handleClick = () => {
    onCardClick(card);
  }
  const handleLikeClick = () => {
    onCardLike(card)
  }
  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  return (
    <div className="element">
      {isOwn && 
        <button 
          className='button button_type_delete-button' 
          onClick={handleDeleteClick}
          type="button"
        />
      }
      <img 
        className="element__img" 
        src={card.link} 
        alt={`Картинка ${card.name}`} 
        onClick={handleClick}
      />
      
      <div className="element__items">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}> 
          </button>
          <span className="element__counterLikes">{card.likes.length}</span>
        </div>  
      </div>
    </div>
  )
}

export default Card;