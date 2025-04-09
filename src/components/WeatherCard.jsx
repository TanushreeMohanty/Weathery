// src/components/WeatherCard.jsx
import { Card, CardContent, Typography, Box } from "@mui/material";

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherDetails, wind } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <Card sx={{ mt: 4, backgroundColor: "#f5f5f5" }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="h6">{weatherDetails[0].main}</Typography>
            <Typography variant="body1">
              Temperature: {main.temp} °C
            </Typography>
            <Typography variant="body1">Humidity: {main.humidity} %</Typography>
            <Typography variant="body1">Wind Speed: {wind.speed} km/h</Typography>
          </Box>
          <Box>
            <img src={iconUrl} alt={weatherDetails[0].description} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
