import closeIcon from "../../assets/close.svg";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, card }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleConfirmClick = () => {
    onConfirm(card);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container modal__container_type_delete">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="" className="modal__close-icon" />
        </button>
        <div className="delete-modal__content">
          <p className="delete-modal__text">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
          <div className="delete-modal__buttons">
            <button
              type="button"
              className="delete-modal__confirm-btn"
              onClick={handleConfirmClick}
            >
              Yes, delete item
            </button>
            <button
              type="button"
              className="delete-modal__cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
