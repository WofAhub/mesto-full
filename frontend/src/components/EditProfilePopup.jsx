import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);


  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    })
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return(
    <PopupWithForm
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName={'Сохранить'}
      id={'form-about'}
      nameForm={'about'}
    >
      <input 
        id="input-profile-name"
        name="name"
        type="text"
        className="pop-up__input pop-up__input_type_profile-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleChangeName}
      />
      <span
        className="pop-up__input-errormessage input-profile-name-error">
      </span>
      <input
        id="input-profile-description"
        name="about"
        type="text"
        className="pop-up__input pop-up__input_type_profile-description"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        required
        value={description || ''}
        onChange={handleChangeDescription}
      />
      <span
        className="pop-up__input-errormessage input-profile-description-error">
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;