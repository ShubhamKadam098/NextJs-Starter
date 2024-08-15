import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const useIsDarkTheme = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const checkIsDark = () => {
      if (theme === "dark") {
        setIsDarkTheme(true);
      } else if (theme === "light") {
        setIsDarkTheme(false);
      } else if (theme === "system") {
        setIsDarkTheme(
          window.matchMedia("(prefers-color-scheme: dark)").matches
        );
      }
    };

    checkIsDark();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        setIsDarkTheme(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return isDarkTheme;
};
