import { IconButton, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useMemo } from "react";

const ThemeToggle = ({ toggleTheme }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const Icon = useMemo(() => (isDark ? Brightness7 : Brightness4), [isDark]);

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      aria-label="Toggle light/dark theme"
      sx={{
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "rotate(20deg)",
        },
      }}
    >
      <Icon sx={{ transition: "color 0.3s ease" }} />
    </IconButton>
  );
};

export default ThemeToggle;
