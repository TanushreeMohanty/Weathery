// src/App.jsx
import {
  Container,
  Typography,
  CssBaseline,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  CircularProgress,
} from "@mui/material";
import { useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ThemeToggle from "./components/ThemeToggle";
import { fetchWeatherData, fetchForecastData } from "./utils/fetchWeather";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion } from "framer-motion";

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const [searchedCity, setSearchedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCitySearch = async (city) => {
    setSearchedCity(city);
    setError("");
    setWeather(null);
    setForecast(null);
    setLoading(true);
    try {
      const weatherData = await fetchWeatherData(city);
      const forecastData = await fetchForecastData(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (searchedCity) handleCitySearch(searchedCity);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">Weather App</Typography>
          <Box>
            <IconButton onClick={handleRefresh} color="inherit" sx={{ mr: 1 }}>
              <RefreshIcon />
            </IconButton>
            <ThemeToggle toggleTheme={() => setMode((prev) => (prev === "light" ? "dark" : "light"))} />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <SearchBar onSearch={handleCitySearch} />

        {error && (
          <Typography color="error" align="center" mt={2}>
            {error}
          </Typography>
        )}

        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <CircularProgress />
            </motion.div>
          </Box>
        )}

        {!loading && weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherCard weather={weather} />
          </motion.div>
        )}

        {!loading && forecast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Forecast forecast={forecast} />
          </motion.div>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
