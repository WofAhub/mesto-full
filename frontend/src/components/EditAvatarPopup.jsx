import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose}) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm 
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName={'Обновить'}
      id={'form-avatar'}
      nameForm={'avatar'}
    >
      <input
        id="input-avatar-url"
        name="avatar"
        type="url"
        className="pop-up__input pop-up__input_type_avatar-url"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />

      <span
        className="pop-up__input-errormessage input-avatar-url-error">
      </span>
    </PopupWithForm>
  )

}

export default EditAvatarPopup;