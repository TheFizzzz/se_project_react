import closeIcon from "../../assets/close.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  isOpen,
  title,
  name,
  onClose,
  onSubmit,
  isValid = false,
  alternateAction,
  alternateText,
  error,
}) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={`modal__container modal_type_${name}`}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          {error && (
            <p className="modal__error" role="alert">
              {error}
            </p>
          )}
          <div className="modal__actions">
            <button type="submit" className="modal__submit" disabled={!isValid}>
              {buttonText}
            </button>
            {alternateAction && (
              <button
                type="button"
                className="modal__alternate"
                onClick={alternateAction}
              >
                {alternateText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
