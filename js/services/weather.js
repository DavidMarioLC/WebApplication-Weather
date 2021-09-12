import { API_KEY, BASE_URL } from "../constants.js";

export async function getCurrentWeather(lat, long) {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) return { isError: true, data: null };
  const data = await response.json();
  return { isError: false, data };
}

export async function getWeeklyWeather(lat, long) {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) return { isError: true, data: null };
  const data = await response.json();

  return { isError: false, data };
}
