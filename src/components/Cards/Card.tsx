import { Box, SxProps, Theme, styled } from "@mui/material";
import { FC } from "react";
import { useColors } from "../../hooks/use-colors";

interface CardProps {
  sx?: SxProps<Theme>;
  children: any;
}
const Card: FC<CardProps> = ({ sx, children }) => {
  const colors = useColors();
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 4,
        bgcolor: colors.card,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default Card;
