import { useState } from "react";
import { TextField, Button, Box, useTheme } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const theme = useTheme();

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
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
      gap={2}
      mt={3}
    >
      <TextField
        label="Enter city name"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{
          borderRadius: 3,
          input: {
            padding: "14px",
            borderRadius: 2,
            background: theme.palette.mode === "dark" ? "#1c1c1e" : "#f9f9f9",
          },
          fieldset: {
            borderRadius: 3,
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 6px ${theme.palette.primary.main}`,
            },
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{
          px: 4,
          borderRadius: 3,
          fontWeight: 600,
          boxShadow: `0 4px 12px ${theme.palette.primary.main}55`,
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: `0 6px 18px ${theme.palette.primary.main}88`,
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
