import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const initialValues = { name: "", avatar: "", email: "", password: "" };

function RegisterModal({ isOpen, onClose, onRegister, onOpenLogin, error }) {
  const { values, handleChange, resetForm } = useForm(initialValues);
  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values, resetForm);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      error={error}
      alternateAction={onOpenLogin}
      alternateText="or Log In"
      isValid={Boolean(
        values.name.trim().length >= 2 &&
        values.avatar.trim() &&
        values.email.trim() &&
        values.password,
      )}
    >
      <label className="modal__label" htmlFor="register-email">
        Email*
        <input
          className="modal__input"
          id="register-email"
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-password">
        Password*
        <input
          className="modal__input"
          id="register-password"
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-name">
        Name *
        <input
          className="modal__input"
          id="register-name"
          name="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label className="modal__label" htmlFor="register-avatar">
        Avatar URL *
        <input
          className="modal__input"
          id="register-avatar"
          name="avatar"
          type="url"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
