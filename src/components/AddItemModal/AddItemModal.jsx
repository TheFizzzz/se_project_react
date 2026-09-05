import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const initialFormData = {
  name: "",
  imageUrl: "",
  weather: "",
};

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function AddItemModal({ isOpen, onClose, onAddItem }) {
  const [values, setValues] = useState(initialFormData);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setValues(initialFormData);
      setImageError("");
    }
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (name === "imageUrl") {
      if (value.trim() && !isValidUrl(value.trim())) {
        setImageError("This is not a valid image link");
      } else {
        setImageError("");
      }
    }
  };

  const isValid =
    values.name.trim() !== "" &&
    values.imageUrl.trim() !== "" &&
    isValidUrl(values.imageUrl.trim()) &&
    values.weather !== "" &&
    !imageError;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) {
      return;
    }
    onAddItem(values);
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label" htmlFor="add-garment-name">
        Name
        <input
          className="modal__input"
          id="add-garment-name"
          name="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label
        className={`modal__label ${imageError ? "modal__label_type_error" : ""}`}
        htmlFor="add-garment-image"
      >
        {imageError ? `Image* (${imageError})` : "Image"}
        <input
          className={`modal__input ${imageError ? "modal__input_type_error" : ""}`}
          id="add-garment-image"
          name="imageUrl"
          type="url"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
