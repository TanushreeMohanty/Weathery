import { Card, CardContent, Typography, Grid, useTheme } from "@mui/material";

const groupByDate = (list) => {
  const grouped = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });
  return Object.entries(grouped).slice(0, 5); // First 5 days
};

const Forecast = ({ forecast }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const colors = {
    accent1: "#114D7E",
    accent2: "#0E3A61",
    background: "#061F38",
    textLight: "#DCEBFF",
    textMuted: "#A6BEDC",
  };

  const groupedForecast = groupByDate(forecast.list);

  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        mt={5}
        mb={3}
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: isDark ? colors.textLight : "#114D7E",
        }}
      >
        5-Day Weather Forecast
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {groupedForecast.map(([date, dayItems]) => {
          const temps = dayItems.map((item) => item.main.temp);
          const avgTemp = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
          const { icon, main: condition } = dayItems[0].weather[0];

          const cardBg = isDark
            ? colors.background
            : "linear-gradient(135deg, #e0eafc, #cfdef3)";

          const cardBorder = isDark ? colors.accent2 : "#ccc";

          return (
            <Grid item xs={12} sm={6} md={2.4} key={date}>
              <Card
                sx={{
                  background: cardBg,
                  borderRadius: 3,
                  textAlign: "center",
                  color: isDark ? colors.textLight : "#333",
                  border: `1px solid ${cardBorder}`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: theme.shadows[6],
                  },
                }}
                aria-label={`Forecast for ${date}`}
              >
                <CardContent sx={{ py: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 500,
                      mb: 1,
                      color: isDark ? colors.textMuted : "#555",
                    }}
                  >
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography>

                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={`Weather icon showing ${condition}`}
                    width="60"
                    height="60"
                    loading="lazy"
                    style={{ margin: "0 auto 0.5rem" }}
                  />

                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: isDark ? colors.textLight : "#114D7E" }}
                  >
                    {condition}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 0.5,
                      color: isDark ? colors.textMuted : "#666",
                    }}
                  >
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
