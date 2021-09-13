import { getWeeklyWeather } from "./services/weather.js";
import { getLatitudAndLongitud } from "./geolocation.js";
import { formatWeekList } from "../utils/formatWeekList.js";
import { createDOM } from "../utils/dom.js";
import { createPeriodTime } from "./periodTime.js";
// import { createWeatherFeatures } from "./weatherFeatures.js";
import { draggable } from "./draggable.js";

function createTabPanel(index) {
  const $panel = createDOM(tabPanelTemplate(index));
  if (index > 0) {
    $panel.hidden = true;
  }
  return $panel;
}

function tabPanelTemplate(id) {
  return `
  <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
  <div class="dayWeather" id="dayWeather-${id}">
    <ul class="dayWeather-list" id="dayWeather-list-${id}">
    </ul>
    
  </div>
</div>
  `;
}

function configWeeklyWeather(arrayWeekList) {
  //contenedor del panel
  const $container = document.querySelector(".tabs");
  const otherWeather = [];
  let myIndex = 0;
  arrayWeekList.forEach((arrayDay, index) => {
    //creando panel

    //agregando panel al html
    const $panel = createTabPanel(index);
    $container.append($panel);

    arrayDay.forEach((weather, index) => {
      otherWeather.push(weather);
      const hoursList = $panel.querySelector(".dayWeather-list");
      hoursList.append(createPeriodTime(weather, myIndex));

      const $dayList = document.querySelectorAll(".dayWeather-item");

      $dayList.forEach((element) => {
        element.addEventListener("click", mostrarClimaEscogido);
      });

      myIndex++;
    });
  });

  function mostrarClimaEscogido(e) {
    const $dayList = document.querySelectorAll(".dayWeather-item");
    $dayList.forEach((item) => item.classList.remove("is-selected"));
    e.currentTarget.classList.add("is-selected");

    // console.log(otherWeather[e.currentTarget.dataset.id]);
    const {
      wind: { speed },
      main: { humidity, temp_max, temp_min },
    } = otherWeather[e.currentTarget.dataset.id];

    const $renderFeatures = document.querySelector(".weather-features");
    $renderFeatures.innerHTML = `
    <p class="weather-max">Max: <strong>${temp_max}</strong>°</strong></p>
    <p class="weather-min">Min: <strong>${temp_min}°</strong></p>
    <p class="weather-wind">Viento: <strong>${speed} km/h</strong></p>
    <p class="weather-humidity">Humedad: <strong>${humidity}%</strong></p>
    `;
  }
}

export default async function weeklyWeather() {
  const { lat, long, isError } = await getLatitudAndLongitud();
  const $container = document.querySelector(".weeklyWeather");
  if (isError) return console.error("happened an error");

  const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(
    lat,
    long
  );

  if (weeklyWeatherError)
    return console.log(
      "oh!  a ocurrido un error al traer el pronostico del clima"
    );

  const weekList = formatWeekList(weather.list);
  configWeeklyWeather(weekList);

  draggable($container);
}
