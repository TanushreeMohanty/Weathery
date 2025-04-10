// src/App.jsx
import { useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer"; // ✅ import the Footer

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    mode={mode}
                    toggleTheme={() =>
                      setMode((prev) => (prev === "light" ? "dark" : "light"))
                    }
                  />
                }
              />
            </Routes>
          </div>
          <Footer /> {/* ✅ Add Footer here */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
