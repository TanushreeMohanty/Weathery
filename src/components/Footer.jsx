// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  Tooltip,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const colors = {
    background: "#061F38",
    accent1: "#114D7E",
    accent2: "#0E3A61",
    textLight: "#DCEBFF",
    textMuted: "#A6BEDC",
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        px: 2,
        width: "100%",
        textAlign: "center",
        background: isDark ? colors.background : "#f5f5f5",
        color: isDark ? colors.textLight : "#333",
        borderTop: `1px solid ${isDark ? colors.accent2 : "#ddd"}`,
        transition: "background 0.3s ease",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        alignItems="center"
        spacing={1}
        flexWrap="wrap"
        sx={{ mb: 1 }}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            color: isDark ? colors.textLight : "#333",
          }}
        >
          Made with ❤️ by Tanushree Mohanty
        </Typography>

        <Stack direction="row" spacing={1}>
          <Tooltip title="GitHub">
            <IconButton
              component="a"
              href="https://github.com/TanushreeMohanty"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: isDark ? colors.textLight : "#333",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: colors.accent1,
                  transform: "scale(1.2)",
                },
              }}
            >
              <GitHubIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="LinkedIn">
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/tanushree-mohanty-69353323b/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: isDark ? colors.textLight : "#333",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "#0072b1", // LinkedIn blue
                  transform: "scale(1.2)",
                },
              }}
            >
              <LinkedInIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          fontSize: { xs: "0.7rem", sm: "0.8rem" },
          color: isDark ? colors.textMuted : "#666",
          opacity: 0.8,
        }}
      >
        © {new Date().getFullYear()} <strong>Weathery</strong>. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
