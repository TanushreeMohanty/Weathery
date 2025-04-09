// src/components/ThemeToggle.jsx
import { IconButton, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const ThemeToggle = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {isDark ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeToggle;
