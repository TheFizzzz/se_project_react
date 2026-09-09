import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddGarmentModal,
}) {
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
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleOpenItemModal}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
