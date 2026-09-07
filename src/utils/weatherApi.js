import { coordinates, APIkey } from "./constants";

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  }
  if (temperature >= 66) {
    return "warm";
  }
  return "cold";
}


export function getWeatherData() {
  const { latitude, longitude } = coordinates;
  const apiKey = APIkey.trim();

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then(async (res) => {
    const data = await res.json();

    if (res.ok) {
      return data;
    }

    const message = data.message || res.statusText;
    return Promise.reject(`Weather API error (${res.status}): ${message}`);
  });
}

export function processWeatherData(data) {
  const weather = {};

  weather.city = data.name;
  weather.temperature = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  weather.condition = getWeatherCondition(weather.temperature.F);
  weather.isDay = data.dt >= data.sys.sunrise && data.dt < data.sys.sunset;
  weather.weatherType = data.weather[0].main.toLowerCase();

  return weather;
}
