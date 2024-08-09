const searchButton = document.querySelector(".search-button");
const tempButton = document.querySelector(".temperature-type-button");
const locationInput = document.querySelector(".location-input");
const locationResult = document.querySelector(".location-result");
const conditionsResult = document.querySelector(".conditions-result");
const temperatureResult = document.querySelector(".temperature-result");
var toggle = 0;

searchButton.addEventListener("click", fetchWeatherData);
tempButton.addEventListener("click", convertTemperature);

async function fetchWeatherData() {
  // WEATHER API - https://www.visualcrossing.com/

  try {
    const location = locationInput.value.trim();
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        location +
        "?key=JX7LY9RYQCLWENELFC8FNQFWN"
    );
    const weatherInfo = await response.json();
    const weatherLocation = await weatherInfo.address.toUpperCase();
    const weatherConditions =
      await weatherInfo.currentConditions.conditions.toUpperCase();
    const weatherTemperature = await weatherInfo.currentConditions.temp;
    displayWeatherData(weatherLocation, weatherConditions, weatherTemperature);
  } catch (error) {
    alert("Something went wrong: " + error);
  }
}

function displayWeatherData(weatherLocation, weatherConditions, weatherTemperature) {
  locationResult.textContent = weatherLocation;
  conditionsResult.textContent = weatherConditions;
  temperatureResult.textContent = weatherTemperature.toFixed(0) + " ℉";
}

function convertTemperature() {
  if (temperatureResult.textContent === " ") return;

  const celsius = " ℃";
  const fahrenheit = " ℉";
  const baseValue = Number(temperatureResult.textContent.slice(0, -2));
  if (toggle === 0) {
    const inCelsius = ((baseValue - 32) * (5 / 9)).toFixed(0);
    temperatureResult.textContent = inCelsius + celsius;
    toggle = 1;
  } else {
    const inFahrenheit = (baseValue * (9 / 5) + 32).toFixed(0);
    temperatureResult.textContent = inFahrenheit + fahrenheit;
    toggle = 0;
  }
}
