import weatherBanner from "../../assets/WeatherBanner.png";
import "./WeatherCard.css";

function WeatherCard() {
  const temperature = 75;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temperature}°F</p>
      <img
        className="weather-card__image"
        src={weatherBanner}
        alt="Cloudy weather"
      />
    </section>
  );
}

export default WeatherCard;
