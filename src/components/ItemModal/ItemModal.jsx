import closeIcon from "../../assets/close-light.svg";
import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    onDeleteItem(card);
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
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <div>
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
