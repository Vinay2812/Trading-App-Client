import { ThemeProvider, createTheme } from "@mui/material";
import { FC, createContext, useContext, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

declare module "@mui/material/styles" {
  interface Palette {
    green: Palette["primary"];
    violet: Palette["primary"];
    peach: Palette["primary"];
    purple: Palette["primary"];
    white: Palette["primary"];
    red: Palette["primary"];
    black: Palette["primary"];
    darkblue: Palette["primary"];
  }

  interface PaletteOptions {
    green: PaletteOptions["primary"];
    violet: PaletteOptions["primary"];
    peach: PaletteOptions["primary"];
    purple: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
    black: PaletteOptions["primary"];
    darkblue: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    green: true;
    violet: true;
    peach: true;
    purple: true;
    white: true;
    red: true;
    black: true;
    darkblue: true;
  }
}

interface ThemeProviderProps {
  children: any;
}
const UserThemeContext = createContext("dark");
export const useTheme = () => useContext(UserThemeContext);

type userThemeType = "dark" | "light";

const UserTheme: FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  const [userTheme, setUserTheme] = useState<userThemeType>("dark");
  const { palette } = createTheme();
  const { augmentColor } = palette;
  const createColor = (mainColor: string) =>
    augmentColor({ color: { main: mainColor } });
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: userTheme,
          green: createColor("#5DBA40"),
          violet: createColor("#BC00A3"),
          peach: createColor("#C74B50"),
          purple: createColor("#3F0071"),
          white: createColor("#EEEEEE"),
          red: createColor("#EA5455"),
          black: createColor("#212121"),
          darkblue: createColor("#1F4068"),
        },
        typography: {},
      }),
    [userTheme]
  );
  const value = useMemo(() => {
    useLocalStorage().set("theme", userTheme);
    return { userTheme, setUserTheme };
  }, [userTheme]);

  return (
    <UserThemeContext.Provider value={value as any}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserThemeContext.Provider>
  );
};

export default UserTheme;
