import React from "react";

function PopupWithForm ({
  title, 
  name, 
  buttonName, 
  children, 
  isOpen, 
  onClose, 
  onSubmit,
  id, 
  nameForm
}) {
  
  return (
    <section
      className={`pop-up pop-up_type_${name} pop-up_type_overlay ${isOpen ? 'pop-up_type_active' : ''}`}
      onClick={onClose}
    >
      <div
        className="pop-up__container"
      >
  
        <button
          className="button button_type_close-button"
          type="button"
          onClick={onClose}>
        </button>
  
        <p className="pop-up__title">
          {title}
        </p>
  
        <form
          id={id}
          name={nameForm}
          className={`pop-up__form pop-up__form_type_${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          <fieldset 
            className="pop-up__fieldset"
          >
            {children}
          </fieldset>
          <button
            className="button button_popup-style_valid"
            type="submit">{buttonName}
          </button>
        </form>

      </div>
    </section>
  )
}

export default PopupWithForm;