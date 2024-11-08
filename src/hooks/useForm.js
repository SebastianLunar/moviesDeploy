import { useState } from "react";

function useForm(initialValues = {}) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = ({ target }) => {
    setFormValues(
      {
        ...formValues,
        [target.name]: target.value,
      }
    );
  }

  const resetFormValues = () => {
    setFormValues(initialValues);
  }

  return { formValues, handleInputChange, resetFormValues, setFormValues };
}

export default useForm;