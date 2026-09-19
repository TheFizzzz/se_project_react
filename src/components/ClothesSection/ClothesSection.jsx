import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const ownItems = clothingItems.filter(
    (item) =>
      String(item.owner?._id || item.owner) === String(currentUser?._id),
  );
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="clothes-section__add"
          onClick={handleOpenAddGarmentModal}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {ownItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleOpenItemModal}
            onCardLike={onCardLike}
            isLoggedIn
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
