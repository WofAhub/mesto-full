import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "./hooks/useForm";

function AddPlacePopup({onAddPlace, isOpen, onClose, ...commonProps}) {

  const {formValue, handleChange} = useForm({
    name: '',
    link: ''
  })

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(formValue)
  }

  React.useEffect(() => {
    formValue.name = '';
    formValue.link = '';
  }, [formValue, isOpen])

  return (
    <PopupWithForm
      title={'Новое место'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonName={'Добавить'}
      id={'form-place'}
      nameForm={'place'}
      {...commonProps}
    >
      <input 
        id="input-add-name"
        name="name"
        type="text"
        className="pop-up__input pop-up__input_type_img-name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={formValue.name}
        onChange={handleChange}  
      />
      <span
        className="pop-up__input-errormessage input-add-name-error">
      </span>

      <input
        id="input-add-url"
        name="link"
        type="url"
        className="pop-up__input pop-up__input_type_img-url"
        placeholder="Ссылка на картинку"
        required
        value={formValue.link}
        onChange={handleChange}  
      />
      <span
        className="pop-up__input-errormessage input-add-url-error">
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;