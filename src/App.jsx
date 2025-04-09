// src/App.jsx
import { useState } from "react";
import {
  Container,
  Typography,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { fetchWeatherData, fetchForecastData } from "./utils/fetchWeather";
import Forecast from "./components/Forecast";

function App() {
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // NEW
  const [forecast, setForecast] = useState(null);

  const handleCitySearch = async (city) => {
    setSearchedCity(city);
    setError("");
    setWeather(null);
    setLoading(true); // Start loading
    setForecast(null);
    const forecastData = await fetchForecastData(city);
    setForecast(forecastData);

    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop loading in both success/failure
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Weather App
        </Typography>

        <SearchBar onSearch={handleCitySearch} />

        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
          {loading && <CircularProgress />} {/* Show loader */}

          {error && (
            <Typography color="error" align="center" mt={2}>
              {error}
            </Typography>
          )}

          {weather && !loading && <WeatherCard weather={weather} />}
          {forecast && !loading && <Forecast forecast={forecast} />}

        </Box>
      </Container>
    </>
  );
}

export default App;
