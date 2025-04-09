// src/components/Forecast.jsx
import { Card, CardContent, Typography, Grid } from "@mui/material";

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

  return (
    <>
      <Typography variant="h6" mt={4} mb={2}>
        5-Day Forecast
      </Typography>

      <Grid container spacing={2}>
        {grouped.map(([date, items]) => {
          const temps = items.map((i) => i.main.temp);
          const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
          const icon = items[0].weather[0].icon;
          const condition = items[0].weather[0].main;

          return (
            <Grid item xs={6} sm={4} md={2.4} key={date}>
              <Card>
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="subtitle2">{date}</Typography>
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={condition}
                    style={{ width: 50 }}
                  />
                  <Typography variant="body1">{condition}</Typography>
                  <Typography variant="body2">{avgTemp}°C</Typography>
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
