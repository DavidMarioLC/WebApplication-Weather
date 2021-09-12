import { getWeeklyWeather } from "./services/weather.js";
import { getLatitudAndLongitud } from "./geolocation.js";
import { formatWeekList } from "../utils/formatWeekList.js";
import { createDOM } from "../utils/dom.js";
import { createPeriodTime } from "./periodTime.js";
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

function configWeeklyWeather(weekList) {
  // const $container = document.querySelector(".weeklyWeather");
  const $container = document.querySelector(".tabs");
  weekList.forEach((day, index) => {
    const $panel = createTabPanel(index);
    $container.append($panel);

    day.forEach((weather, index) => {
      $panel
        .querySelector(".dayWeather-list")
        .append(createPeriodTime(weather));
    });
  });
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
