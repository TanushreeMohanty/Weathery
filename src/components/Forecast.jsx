// src/components/Forecast.jsx
import { Card, CardContent, Typography, Grid, useTheme } from "@mui/material";

const groupByDate = (list) => {
  const map = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!map[date]) map[date] = [];
    map[date].push(item);
  });

  return Object.entries(map).slice(0, 5); // Get first 5 days
};

const Forecast = ({ forecast }) => {
  const grouped = groupByDate(forecast.list);
  const theme = useTheme();

  return (
    <>
      <Typography
        variant="h5"
        mt={4}
        mb={2}
        sx={{ fontWeight: 600, textAlign: "center", color: theme.palette.text.primary }}
      >
        5-Day Forecast
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {grouped.map(([date, items]) => {
          const temps = items.map((i) => i.main.temp);
          const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
          const icon = items[0].weather[0].icon;
          const condition = items[0].weather[0].main;

          return (
            <Grid item xs={12} sm={6} md={2.4} key={date}>
              <Card
                sx={{
                  background: theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, #1f1c2c, #928dab)"
                    : "linear-gradient(135deg, #e0eafc, #cfdef3)",
                  color: theme.palette.text.primary,
                  borderRadius: 3,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={condition}
                    style={{
                      width: 60,
                      height: 60,
                      margin: "0.5rem auto",
                      padding: "6px",
                    }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {condition}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    Avg: {avgTemp}°C
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Forecast;
