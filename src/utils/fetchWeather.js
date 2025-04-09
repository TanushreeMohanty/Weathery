// src/utils/fetchWeather.js
const API_KEY = 'fc5f31c5a4c043a1efd831c3d99b4358'; // Replace with your actual OpenWeatherMap API key

export const fetchWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("City not found. Please enter a valid city name.");
    } else {
      throw new Error("Failed to fetch weather data. Please try again.");
    }
  }

  return await response.json();
};

export const fetchForecastData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch 5-day forecast.");
  }

  return await response.json();
};
