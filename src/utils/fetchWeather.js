// src/utils/fetchWeather.js
const API_KEY = 'fc5f31c5a4c043a1efd831c3d99b4358'; // Replace with your actual OpenWeatherMap API key

export const fetchWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('City not found');
  }

  const data = await response.json();
  return data;
};
