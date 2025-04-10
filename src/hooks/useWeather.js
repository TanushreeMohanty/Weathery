// src/hooks/useWeather.js
import { useState, useEffect } from "react";
import {
  geocodeCity,
  fetchWeatherData,
  fetchForecastData,
  fetchAirPollution,
  fetchAlerts,
  fetchHourlyForecast,
  fetchDailyForecast,
} from "../api/weatherApi";

const useWeather = (city) => {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [air, setAir] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const location = await geocodeCity(city);
        const { lat, lon } = location;

        const [weatherRes, forecastRes, airRes, alertsRes, hourlyRes, dailyRes] =
          await Promise.all([
            fetchWeatherData(city),
            fetchForecastData(city),
            fetchAirPollution(lat, lon),
            fetchAlerts(lat, lon),
            fetchHourlyForecast(lat, lon), // PRO PLAN ONLY
            fetchDailyForecast(lat, lon),  // May require PRO plan too
          ]);

        setWeather(weatherRes);
        setForecast(forecastRes);
        setAir(airRes.list[0]);
        setAlerts(alertsRes.alerts || []);
        setHourly(hourlyRes.list || []);
        setDaily(dailyRes.list || []);
        setError("");
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return {
    loading,
    weather,
    forecast,
    air,
    alerts,
    hourly,
    daily,
    error,
  };
};

export default useWeather;
