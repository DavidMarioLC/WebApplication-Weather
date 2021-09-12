import currentWeather from "./current-weather.js";
import weeklyWeather from "./weekly-weather.js";

import { viewPortSize } from "../utils/viewport.js";
import "./tabs.js";

const $app = document.querySelector("#app");
const $loading = document.querySelector("#loading");

viewPortSize($app);
viewPortSize($loading);

currentWeather();
weeklyWeather();
