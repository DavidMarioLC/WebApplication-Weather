// import weather from "../data/current-weather.js";
import { formatDate } from "../utils/formatDate.js";
import { formatTemp } from "../utils/formatTemp.js";
import { weatherConditionsCodes } from "./constants.js";
import { getLatitudAndLongitud } from "./geolocation.js";
import { getCurrentWeather } from "./services/weather.js";

function solarStatus(sunsetTime, sunriseTime) {
  const currentHours = new Date().getHours();
  const sunsetHours = sunsetTime.getHours();
  const sunriseHours = sunriseTime.getHours();

  const itIsNight = currentHours > sunsetHours || currentHours < sunriseHours;

  if (itIsNight) {
    return "night";
  }

  return "morning";
}

function setBackground($app, conditionCode, nameImage) {
  const weatherType = weatherConditionsCodes[conditionCode];
  const isBig = window.matchMedia("(-webkit-min-device-pixel-ratio:2)").matches;
  const size = isBig ? "@2x" : "";

  $app.style.backgroundImage = `url(./images/${nameImage}-${weatherType}${size}.jpg)`;
}

function setCurrentTemp($element, temp) {
  $element.textContent = formatTemp(temp);
}

function setCurrentDate($element) {
  const date = new Date();
  $element.textContent = formatDate(date);
}

function setCurrentCity($element, city = "") {
  $element.textContent = city;
}

function showCurrentWeather($app, $loading) {
  // console.log($app.hidden, $loading.hidden);
  $app.hidden = false;
  $loading.hidden = true;
}

function configCurrentWeather(weather) {
  const $app = document.querySelector("#app");
  const $loading = document.querySelector("#loading");
  //loader
  showCurrentWeather($app, $loading);
  //date
  const $currentWeatherDate = document.querySelector("#current-weather-date");
  setCurrentDate($currentWeatherDate);
  //city
  const $currentWeatherCity = document.querySelector("#current-weather-city");
  const name = weather.name;
  setCurrentCity($currentWeatherCity, name);
  //temp
  const $currentWeatherTemp = document.querySelector("#current-weather-temp");
  const temp = weather.main.temp;
  setCurrentTemp($currentWeatherTemp, temp);

  //background
  const sunsetTime = new Date(weather.sys.sunset * 1000);
  const sunriseTime = new Date(weather.sys.sunrise * 1000);

  const conditionCode = String(weather.weather[0].id).charAt(0);

  setBackground($app, conditionCode, solarStatus(sunsetTime, sunriseTime));
}

export default async function currentWeather() {
  const { lat, long, isError } = await getLatitudAndLongitud();

  if (isError) return console.error("happened an error");

  const { isError: currentWeatherError, data: weather } =
    await getCurrentWeather(lat, long);

  if (currentWeatherError) {
    return console.log("oh!  a ocurrido un error al traer los datos de la API");
  }

  configCurrentWeather(weather);
}
