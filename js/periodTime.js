import { createDOM } from "../utils/dom.js";
import { formatDate } from "../utils/formatDate.js";
import { formatTemp } from "../utils/formatTemp.js";

export function periodTimeTemplate({ temp, date, icon, description }) {
  return `
  <li class="dayWeather-item is-selected">
  <span class="dayWeather-time">${date}</span>
  <img
    class="dayWeather-icon"
    src="https://openweathermap.org/img/wn/${icon}@2x.png"
    height='48'
    width='48'
    alt="${description}"
    rain=""
  />
  <span class="dayWeather-temp">${temp}°</span>
</li> `;
}

export function createPeriodTime(weather) {
  // debugger;
  const dateOptions = {
    hour: "numeric",
    hour12: true,
  };

  const config = {
    temp: formatTemp(weather.main.temp),
    date: formatDate(new Date(weather.dt * 1000), dateOptions),
    icon: weather.weather[0].icon,
    description: weather.weather[0].description,
  };

  return createDOM(periodTimeTemplate(config));
}
