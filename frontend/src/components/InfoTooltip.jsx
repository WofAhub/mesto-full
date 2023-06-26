import React from "react";
import accept from "../images/Accept.png";
import fail from '../images/Fail.png';

function InfoTooltip({ isSuccess, onClose, isOpen }) {

  return (
    <div 
      className={`pop-up pop-up_type_infotooltip pop-up_type_overlay ${isOpen ? 'pop-up_type_active' : ''}`}
      onClick={onClose}
    >
      <div className="pop-up__container pop-up__container_type_infootooltip">
        <button
          className="button button_type_close-button"
          type="button"
          onClick={onClose}
        />

        <img
          className="pop-up__infotooltip-img"
          src={isSuccess ? accept : fail}
          alt="Результат регистрации"
        />

        <h3 className="pop-up__infotooltip-caption">
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
