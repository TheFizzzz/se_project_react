import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal }) {
  return (
    <main className="main">
      <WeatherCard />
      <p className="cards__text">Today is 75° F / You may want to wear:</p>
      <ul className="cards__list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleOpenItemModal}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
