import { useContext } from "react";
import cloudyBanner from "../../assets/cloudy.png";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temperature?.[currentTemperatureUnit] ?? "..."}°{" "}
        {currentTemperatureUnit}
      </p>
      <img
        className="weather-card__image"
        src={cloudyBanner}
        alt="Current weather"
      />
    </section>
  );
}

export default WeatherCard;
