import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { format } from "date-fns";

function WeatherCard({ weather }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const colors = {
    accent1: "#114D7E",
    accent2: "#0E3A61",
    background: "#061F38",
    textLight: "#DCEBFF",
    textMuted: "#A6BEDC",
  };

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: weatherInfo,
    wind: { speed },
    visibility,
    clouds: { all: cloudiness },
    sys: { sunrise, sunset },
  } = weather;

  const weatherCondition = weatherInfo[0].main;
  const weatherDesc = weatherInfo[0].description;
  const icon = weatherInfo[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  const formatTime = (timestamp) => format(new Date(timestamp * 1000), "hh:mm a");

  return (
    <Card
      sx={{
        mt: 4,
        px: 2,
        py: 3,
        borderRadius: 4,
        boxShadow: isDark
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : "0 8px 24px rgba(0,0,0,0.15)",
        background: isDark
          ? `linear-gradient(135deg, ${colors.background}cc, ${colors.accent2}dd)`
          : `linear-gradient(135deg, #ffffffaa, #e3f2fdcc)`,
        backdropFilter: "blur(10px)",
        color: isDark ? colors.textLight : colors.accent2,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: isDark
            ? "0 12px 32px rgba(0,0,0,0.5)"
            : "0 12px 32px rgba(0,0,0,0.25)",
        },
      }}
      aria-label={`Current weather in ${name}`}
    >
      <CardContent>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          align="center"
          gutterBottom
          fontWeight="bold"
          component="h2"
        >
          {name}
        </Typography>

        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent="center"
          gap={isMobile ? 2 : 4}
          mb={2}
        >
          <img
            src={iconUrl}
            alt={`${weatherCondition} icon`}
            width={isMobile ? 90 : 110}
            loading="lazy"
            style={{
              filter: isDark ? `drop-shadow(0 0 6px ${colors.textLight})` : "none",
            }}
          />
          <Box textAlign="center">
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: isDark ? colors.textLight : colors.accent2 }}
            >
              {Math.round(temp)}°C
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                textTransform: "capitalize",
                opacity: 0.9,
                color: isDark ? colors.textMuted : "#444",
              }}
            >
              {weatherDesc}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Feels like {Math.round(feels_like)}°C
            </Typography>
          </Box>
        </Box>

        <GridSection
          items={[
            { label: "Humidity", value: `${humidity}%` },
            { label: "Pressure", value: `${pressure} hPa` },
            { label: "Wind Speed", value: `${speed} km/h` },
            { label: "Visibility", value: `${visibility / 1000} km` },
            { label: "Cloudiness", value: `${cloudiness}%` },
            { label: "Sunrise", value: formatTime(sunrise) },
            { label: "Sunset", value: formatTime(sunset) },
          ]}
          isDark={isDark}
          isMobile={isMobile}
          colors={colors}
        />
      </CardContent>
    </Card>
  );
}

const GridSection = ({ items, isDark, isMobile, colors }) => (
  <Box
    display="grid"
    gridTemplateColumns={isMobile ? "1fr" : "repeat(3, 1fr)"}
    gap={2}
    mt={2}
    textAlign="center"
  >
    {items.map(({ label, value }) => (
      <Box key={label}>
        <Typography
          variant="subtitle2"
          fontWeight="medium"
          sx={{
            color: isDark ? colors.accent1 : colors.accent2,
          }}
        >
          {label}
        </Typography>
        <Typography component="p" sx={{ color: isDark ? colors.textLight : "#333" }}>
          {value}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default WeatherCard;
