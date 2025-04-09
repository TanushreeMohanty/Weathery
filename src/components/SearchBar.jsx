// src/components/SearchBar.jsx
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

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
    <Box display="flex" gap={2} mt={3}>
      <TextField
        label="Enter city name"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ minWidth: "100px" }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
