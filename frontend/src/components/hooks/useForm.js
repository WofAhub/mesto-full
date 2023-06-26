import { useState } from "react";

const useForm = (initialState) => {
  const [formValue, setFormValue] = useState(initialState);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  return { formValue, handleChange };
}

export default useForm;