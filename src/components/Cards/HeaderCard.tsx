import { FC } from "react";
import Card from "./Card";
import { Box, SxProps, Theme, Typography } from "@mui/material";
import { useColors } from "../../hooks/use-colors";

interface HeaderCardProps {
  sx?: SxProps<Theme>;
  title: string;
  subtitle: string;
  buttonBox?: JSX.Element;
}

const HeaderCard: FC<HeaderCardProps> = (props) => {
  const { sx } = props;
  const colors = useColors();
  return (
    <Card
      sx={{
        display: "flex",
        width: "100%",
        height: "90px",
        justifyContent: "space-between",
        ...sx
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: colors.blue[400], overflow: "hidden", fontWeight: 500 }}
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
      <Box display="flex" alignItems="center">
        {props.buttonBox}
      </Box>
    </Card>
  );
};

export default HeaderCard;
