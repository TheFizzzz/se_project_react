import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

const initialValues = { name: "", avatar: "" };

function EditProfileModal({ isOpen, onClose, onUpdate, currentUser, error }) {
  const { values, handleChange, setValues } = useForm(initialValues);
  useEffect(() => {
    if (isOpen)
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      error={error}
      isValid={Boolean(values.name.trim().length >= 2 && values.avatar.trim())}
    >
      <label className="modal__label" htmlFor="profile-name">
        Name
        <input
          className="modal__input"
          id="profile-name"
          name="name"
          value={values.name}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label className="modal__label" htmlFor="profile-avatar">
        Avatar *
        <input
          className="modal__input"
          id="profile-avatar"
          name="avatar"
          type="url"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
