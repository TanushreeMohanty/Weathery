// src/App.jsx
import { useState } from "react";
import { Container, Typography, CssBaseline } from "@mui/material";
import SearchBar from "./components/SearchBar";

function App() {
  const [searchedCity, setSearchedCity] = useState("");

  const handleCitySearch = (city) => {
    console.log("Searching for:", city);
    setSearchedCity(city);
    // This is where you'll fetch weather data later
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Weather App
        </Typography>

        <SearchBar onSearch={handleCitySearch} />
      </Container>
    </>
  );
}

export default App;
