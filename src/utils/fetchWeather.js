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

export const fetchAirPollution = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch air pollution.");
  return await response.json();
};

export const fetchAlerts = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&exclude=minutely,hourly,daily,current`
  );
  if (!response.ok) throw new Error("Failed to fetch alerts.");
  return await response.json();
};

export const fetchHourlyForecast = async (lat, lon) => {
  const response = await fetch(
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Failed to fetch hourly forecast.");
  return await response.json();
};

export const fetchDailyForecast = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=16&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Failed to fetch daily forecast.");
  return await response.json();
};

export const geocodeCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  if (!response.ok) throw new Error("Geocoding failed.");
  const data = await response.json();
  return data[0];
};
