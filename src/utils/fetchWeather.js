const API_KEY = 'fc5f31c5a4c043a1efd831c3d99b4358';

export const fetchWeatherData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Failed to fetch weather.");
  return await response.json();
};

export const fetchForecastData = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Failed to fetch forecast.");
  return await response.json();
};