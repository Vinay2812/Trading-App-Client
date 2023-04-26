import { FC } from "react";
import Card from "./Card";
import { Box, Typography } from "@mui/material";
import { useColors } from "../../hooks/useColors";

interface HeaderCardProps {
  title: string;
  subtitle: string;
  buttonBox?: JSX.Element;
}

const HeaderCard: FC<HeaderCardProps> = (props) => {
  const colors = useColors();
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        height: "90px",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}>
        <Typography
          variant="h5"
          sx={{ color: colors.blue[400], overflow: "hidden" }}
        >
          {props.title.toUpperCase()}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: colors.textColor[600], overflow: "hidden" }}
        >
          {props.subtitle}
        </Typography>
      </Box>
      <Box>
        {props.buttonBox}
      </Box>
    </Card>
  );
};

export default HeaderCard;
