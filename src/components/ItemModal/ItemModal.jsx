import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import closeIcon from "../../assets/close-light.svg";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onOpenConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = Boolean(
    currentUser &&
    card.owner &&
    String(card.owner?._id || card.owner) === String(currentUser._id),
  );
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    onOpenConfirmationModal(card);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container modal__container_type_image">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="" className="modal__close-icon" />
        </button>
        <div className="modal__image-wrap">
          <img className="modal__image" src={card.link} alt={card.name} />
          <p className="modal__caption">{card.name}</p>
        </div>
        <div className="modal__item-details">
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
