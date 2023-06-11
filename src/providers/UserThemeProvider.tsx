import { ThemeProvider, createTheme } from "@mui/material";
import {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useLocalStorage from "../hooks/use-local-storage";
import { tokens } from "../utils/theme";

declare module "@mui/material/styles" {
  interface Palette {
    indigo: Palette["primary"];
    blue: Palette["primary"];
    green: Palette["primary"];
    red: Palette["primary"];
    violet: Palette["primary"];
    bgColor: Palette["primary"];
    card: Palette["primary"];
    sidebar: Palette["primary"];
    textColor: Palette["primary"];
  }

  interface PaletteOptions {
    indigo: PaletteOptions["primary"];
    blue: PaletteOptions["primary"];
    green: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
    violet: PaletteOptions["primary"];
    bgColor: PaletteOptions["primary"];
    card: PaletteOptions["primary"];
    sidebar: PaletteOptions["primary"];
    textColor: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    indigo: true;
    blue: true;
    green: true;
    red: true;
    violet: true;
  }
}
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    indigo: true;
    blue: true;
    green: true;
    red: true;
    violet: true;
  }
}

interface ThemeProviderProps {
  children: any;
}
const UserThemeContext = createContext({
  toggleTheme: () => {},
});
export const useToggleTheme = () => useContext(UserThemeContext);

type userThemeType = "dark" | "light";

const UserTheme: FC<ThemeProviderProps> = (props) => {
  const { children } = props;
  const [userTheme, setUserTheme] = useState<userThemeType>("dark");
  const { palette } = createTheme();

  const colors = tokens(userTheme);

  const { augmentColor } = palette;
  const createColor = (mainColor: string) =>
    augmentColor({ color: { main: mainColor } });
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: userTheme,
          violet: createColor(colors.violet[500]),
          indigo: createColor(colors.indigo[500]),
          blue: createColor(colors.blue[500]),
          green: createColor(colors.green[500]),
          red: createColor(colors.red[500]),
          bgColor: createColor(colors.bgColor),
          card: createColor(colors.card),
          sidebar: createColor(colors.sidebar),
          textColor: createColor(colors.textColor[500]),
          background: {
            default: colors.bgColor,
          },
        },
        typography: {},
      }),
    // createTheme(themeSettings(userTheme)),
    [userTheme]
  );
  const toggleTheme = useMemo(() => {
    return () =>
      // setUserTheme((prev: userThemeType) =>
      //   prev === "dark" ? "light" : "dark"
      // );
      setUserTheme((prev) => prev);
  }, []);

  const value = useMemo(() => ({ toggleTheme }), [toggleTheme]);

  useEffect(() => {
    useLocalStorage().set("theme", userTheme);
  }, [userTheme]);

  return (
    <UserThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserThemeContext.Provider>
  );
};

export default UserTheme;
