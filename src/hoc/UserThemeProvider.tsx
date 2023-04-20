import { ThemeProvider, createTheme } from "@mui/material";
import {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { tokens } from "../utils/theme";

declare module "@mui/material/styles" {
  interface Palette {
    indigo: Palette["primary"];
    blue: Palette["primary"];
    green: Palette["primary"];
    red: Palette["primary"];
    violet: Palette["primary"];
    backgroundAccent: Palette["primary"];
    cardAccent: Palette["primary"];
    sidebarAccent: Palette["primary"];
    // topbarAccent: Palette["primary"];
    inputAccent: Palette["primary"];
  }

  interface PaletteOptions {
    indigo: PaletteOptions["primary"];
    blue: PaletteOptions["primary"];
    green: PaletteOptions["primary"];
    red: PaletteOptions["primary"];
    violet: PaletteOptions["primary"];
    backgroundAccent: PaletteOptions["primary"];
    cardAccent: PaletteOptions["primary"];
    sidebarAccent: PaletteOptions["primary"];
    // topbarAccent: PaletteOptions["primary"];
    inputAccent: PaletteOptions["primary"];
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

interface ThemeProviderProps {
  children: any;
}
const UserThemeContext = createContext({
  toggleTheme: () => {},
});
export const useTheme = () => useContext(UserThemeContext);

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
          // primary: createColor(colors.primary[500]),
          violet: createColor(colors.violet[500]),
          indigo: createColor(colors.indigo[500]),
          blue: createColor(colors.blue[500]),
          green: createColor(colors.green[500]),
          red: createColor(colors.red[500]),
          backgroundAccent: createColor(colors.backgroundAccent),
          cardAccent: createColor(colors.cardAccent),
          sidebarAccent: createColor(colors.sidebarAccent),
          // topbarAccent: createColor(colors.topbarAccent),
          inputAccent: createColor(colors.inputAccent),
          background: {
            default: colors.backgroundAccent,
          }
        },
        typography: {},
      }),
    // createTheme(themeSettings(userTheme)),
    [userTheme]
  );
  const toggleTheme = useMemo(() => {
    return () =>
      setUserTheme((prev: userThemeType) =>
        prev === "dark" ? "light" : "dark"
      );
  }, []);

  useEffect(() => {
    useLocalStorage().set("theme", userTheme);
  }, [userTheme]);

  return (
    <UserThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </UserThemeContext.Provider>
  );
};

export default UserTheme;
