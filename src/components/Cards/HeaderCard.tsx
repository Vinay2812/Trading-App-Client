import { FC } from "react";
import Card from "./Card";
import { Typography } from "@mui/material";
import { useColors } from "../../hooks/useColors";

interface HeaderCardProps {
  title: string;
  subtitle: string;
}

const HeaderCard: FC<HeaderCardProps> = (props) => {
    const colors = useColors();
  return <Card sx={{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "90px"
  }}>
    <Typography variant="h5" sx={{color: colors.blue[400]}}>{props.title.toUpperCase()}</Typography>
    <Typography variant="body1"sx={{color: colors.textColor[600]}}>{props.subtitle}</Typography>
  </Card>;
};

export default HeaderCard;
