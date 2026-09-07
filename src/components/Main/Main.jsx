import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({
  weatherData,
  isWeatherLoading,
  clothingItems,
  handleOpenItemModal,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = weatherData.condition
    ? clothingItems.filter(
        (item) => item.weather.toLowerCase() === weatherData.condition,
      )
    : [];

  const cardsMessage = isWeatherLoading
    ? "Loading weather..."
    : weatherData.condition
      ? `Today is ${weatherData.temperature[currentTemperatureUnit]}° ${currentTemperatureUnit} / You may want to wear:`
      : "Unable to load weather. Your API key may still be activating (can take up to 2 hours) or may be incorrect. Check utils/constants.js and your OpenWeather dashboard.";

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="cards__text">{cardsMessage}</p>
      <ul className="cards__list">
        {filteredItems.map((item) => (
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
