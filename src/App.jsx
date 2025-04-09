// src/App.jsx
import { useState } from "react";
import {
  Container,
  Typography,
  CssBaseline,
  Box
} from "@mui/material";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { fetchWeatherData } from "./utils/fetchWeather";

function App() {
  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleCitySearch = async (city) => {
    setSearchedCity(city);
    setError("");
    setWeather(null);
    try {
      const data = await fetchWeatherData(city);
      setWeather(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
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

        <Box mt={2}>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

          {weather && <WeatherCard weather={weather} />}
        </Box>
      </Container>
    </>
  );
}

export default App;
