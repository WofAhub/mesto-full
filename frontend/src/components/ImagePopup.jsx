import React from "react"

function ImagePopup({card, onClose}) {
  return(
    <div 
      className={`pop-up pop-up_type_img pop-up_type_overlay ${Object.keys(card).length !==0 ? 'pop-up_type_active' : ''}`}
      onClick={onClose}
      >
      <figure className="pop-up__img-container">

        <button
          className="button button_type_close-button"
          type="button"
          onClick={onClose}>
        </button>

        <img 
          className="pop-up__img" 
          src={card.link} 
          alt={`Картинка ${card.name}`}
        />
        <figcaption className="pop-up__img-caption">{card.name}</figcaption>

      </figure>
    </div>
  )
}

export default ImagePopup;