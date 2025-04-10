import { useState } from "react";
import { TextField, Button, Box, useTheme } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const colors = {
    accent1: "#114D7E",
    accent2: "#0E3A61",
    background: "#061F38",
    textLight: "#DCEBFF",
    textMuted: "#A6BEDC",
  };

  const handleSearch = () => {
    const trimmedCity = city.trim();
    if (trimmedCity !== "") {
      onSearch(trimmedCity);
      setCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      gap={2}
      mt={3}
    >
      <TextField
        label="Enter city name"
        aria-label="Enter city name"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          input: {
            padding: "14px",
            borderRadius: 2,
            backgroundColor: isDark ? colors.background : "#f4f6f8",
            color: isDark ? colors.textLight : "#333",
          },
          label: {
            color: isDark ? colors.textMuted : "#666",
          },
          fieldset: {
            borderRadius: 3,
            borderColor: isDark ? colors.accent2 : "#ccc",
          },
          "& .MuiOutlinedInput-root": {
            fontWeight: 500,
            "&.Mui-focused fieldset": {
              borderColor: colors.accent1,
              boxShadow: `0 0 6px ${colors.accent1}88`,
            },
          },
        }}
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        aria-label="Search for city weather"
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 3,
          fontWeight: 600,
          textTransform: "none",
          backgroundColor: colors.accent1,
          color: "#fff",
          boxShadow: `0 4px 12px ${colors.accent1}55`,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: colors.accent2,
            transform: "scale(1.05)",
            boxShadow: `0 6px 18px ${colors.accent2}88`,
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
