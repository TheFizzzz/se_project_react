import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = Boolean(
    currentUser &&
    item.likes?.some((id) => String(id?._id || id) === String(currentUser._id)),
  );
  return (
    <li className="card">
      <div className="card__header">
        <p className="card__name">{item.name}</p>
        {isLoggedIn && (
          <button
            type="button"
            className={`card__like ${isLiked ? "card__like_active" : ""}`}
            aria-label={isLiked ? `Unlike ${item.name}` : `Like ${item.name}`}
            onClick={() => onCardLike(item)}
          >
            <span className="card__like-icon" aria-hidden="true" />
          </button>
        )}
      </div>
      <img
        className="card__image"
        src={item.link}
        alt={item.name}
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;
