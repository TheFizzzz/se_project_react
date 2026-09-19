import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const initialValues = { email: "", password: "" };

function LoginModal({ isOpen, onClose, onLogin, onOpenRegister, error }) {
  const { values, handleChange, resetForm } = useForm(initialValues);
  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(values, resetForm);
  };

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      error={error}
      alternateAction={onOpenRegister}
      alternateText="or Sign Up"
      isValid={Boolean(values.email.trim() && values.password)}
    >
      <label className="modal__label" htmlFor="login-email">
        Email
        <input
          className="modal__input"
          id="login-email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="login-password">
        Password
        <input
          className="modal__input"
          id="login-password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
