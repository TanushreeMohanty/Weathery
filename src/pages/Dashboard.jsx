import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AirIcon from "@mui/icons-material/Air";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import ThemeToggle from "../components/ThemeToggle";
import { fetchWeatherData, fetchForecastData } from "../utils/fetchWeather";
import logo from "../assets/logo.png";

// Wind Compass
const WindCompass = ({ degree }) => (
  <Box
    sx={{
      width: 100,
      height: 100,
      borderRadius: "50%",
      border: "2px solid",
      borderColor: "divider",
      position: "relative",
      mx: "auto",
      mt: 2,
    }}
  >
    <Box
      sx={{
        width: 4,
        height: "45%",
        backgroundColor: "red",
        position: "absolute",
        top: "5%",
        left: "50%",
        transform: `translateX(-50%) rotate(${degree}deg)`,
        transformOrigin: "bottom center",
      }}
    />
    <Typography
      sx={{
        position: "absolute",
        top: "-1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        fontWeight: "bold",
      }}
    >
      N
    </Typography>
  </Box>
);

const Dashboard = ({ mode, toggleTheme }) => {
  const [searchedCity, setSearchedCity] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date());

  const theme = useTheme();

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
      setError(err.message || "Unable to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (searchedCity) handleCitySearch(searchedCity);
  };

  useEffect(() => {
    handleCitySearch(searchedCity);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hourlyForecast = forecast?.list?.filter((_, index) => index < 12);

  return (
    <>
      {/* AppBar with gradient and responsive layout */}
      <AppBar
  position="static"
  sx={{
    background: "linear-gradient(135deg, #10439F, #874CCC)",
    px: 2,
  }}
>

        <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 40,
                width: 40,
                objectFit: "contain",
                borderRadius: "50%",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              }}
            >
              Weathery Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: { xs: 1, sm: 0 } }}>
            <IconButton onClick={handleRefresh} color="inherit" sx={{ mr: 1 }}>
              <RefreshIcon />
            </IconButton>
            <ThemeToggle toggleTheme={toggleTheme} />
          </Box>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          mt: 4,
          borderRadius: 4,
          p: 3,
        }}
      >
        {/* Clock */}
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            p: 2,
            borderRadius: 3,
            background:
              mode === "dark"
                ? "linear-gradient(to right, #333, #444)"
                : "linear-gradient(135deg, #0B2A4D 0%, #072F4D 100%)",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="h6">
            Current Time: {time.toLocaleTimeString()}
          </Typography>
        </Paper>

        {/* Search */}
        <SearchBar onSearch={handleCitySearch} />

        {/* Error */}
        {error && (
          <Typography color="error" align="center" mt={2}>
            {error}
          </Typography>
        )}

        {/* Loader */}
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

        {/* Weather Info */}
        {!loading && weather && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherCard weather={weather} mode={mode} />

            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                mt: 2,
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              It’s {Math.round(weather.main.temp)}°C and{" "}
              {weather.weather[0].description} in {weather.name}.{" "}
              {weather.main.temp > 30
                ? "Stay hydrated! 🥵"
                : weather.main.temp < 10
                ? "Bundle up, it’s chilly! ❄️"
                : "Nice weather to be outdoors! 🌤️"}
            </Typography>

            {/* Wind Compass */}
            <Box textAlign="center" mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Wind Direction <AirIcon fontSize="small" />
              </Typography>
              <WindCompass degree={weather.wind.deg} />
            </Box>
          </motion.div>
        )}

        {/* Hourly Forecast */}
        {!loading && hourlyForecast?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ marginTop: "2rem" }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: mode === "dark" ? "#fff" : "#000" }}
            >
              ⏱️ Next 12 Hours Forecast
            </Typography>
            <Box
              className="hide-scrollbar"
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 2,
                p: 1,
                borderRadius: 2,
              }}
            >
              {hourlyForecast.map((hour, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    minWidth: 120,
                    textAlign: "center",
                    backgroundColor: mode === "dark" ? "#444" : "#fff",
                    borderRadius: 3,
                    p: 2,
                    boxShadow: 3,
                    color: mode === "dark" ? "#fff" : "#000",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {new Date(hour.dt * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                  <Typography variant="h5">
                    {Math.round(hour.main.temp)}°C
                  </Typography>
                  <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
                    {hour.weather[0].main}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </motion.div>
        )}

        {/* Forecast */}
        {!loading && forecast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Forecast forecast={forecast} mode={mode} />
          </motion.div>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
