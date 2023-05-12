import { useTheme } from "@mui/material";
import { tokens } from "../utils/theme";

export const useColors = () => {
  const mode = useTheme().palette.mode;
  return tokens(mode);
};

export type ColorsType = ReturnType<typeof useColors>;
