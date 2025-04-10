// src/pages/LandingPage.jsx
import { Button, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import logo from "../assets/logo.png"; // Import your logo here
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Weathery | Real-Time Weather Updates & Forecast</title>
        <meta
          name="description"
          content="Get real-time weather updates, beautiful forecasts, and a sleek dashboard with Weathery."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://yourdomain.com/" />
      </Helmet>

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0B2A4D 0%, #072F4D 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Paper
              elevation={10}
              sx={{
                p: 6,
                maxWidth: 600,
                borderRadius: 6,
                textAlign: "center",
                backdropFilter: "blur(20px)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.4)",
                color: "#fff",
              }}
            >
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  textShadow: "2px 2px 5px rgba(0,0,0,0.4)",
                }}
              >
                <img src={logo} alt="Logo" className="logo-landing" /> Weathery
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 300,
                  mb: 4,
                  fontFamily: "'Open Sans', sans-serif",
                  color: "#BBDEFB",
                }}
              >
                Get real-time weather updates and 5-day forecasts <br />
                with a refreshing visual experience.
              </Typography>

              <motion.div
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/dashboard")}
                  sx={{
                    background: "#ffffff",
                    color: "#10439F",
                    fontWeight: "bold",
                    px: 5,
                    py: 1.5,
                    borderRadius: 8,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                    "&:hover": {
                      background: "#E3F2FD",
                    },
                  }}
                >
                  Launch Dashboard
                </Button>
              </motion.div>
            </Paper>
          </motion.div>
        </motion.div>
      </Box>
    </>
  );
};

export default LandingPage;
