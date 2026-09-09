import { useCallback, useState } from "react";

function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialState);
  }, [initialState]);

  return { values, handleChange, resetForm, setValues };
}

export default useForm;
