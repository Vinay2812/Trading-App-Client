import { Card, SxProps } from "@mui/material";
import { FC } from "react";
import { useColors } from "../../hooks/useColors";
import { Theme } from "@mui/joy";

interface TableCardProps {
  children: any;
}

const TableCard: FC<TableCardProps> = ({ children }) => {
  const colors = useColors();
  return (
    <Card
      sx={{
        mt: "16px",
        width: "100%",
        height: "calc(100% - 90px)",
        bgcolor: `${colors.card}`,
        "& .MuiDataGrid-columnHeaders": {
          mt: 2,
          fontWeight: 700,
          fontSize: "16px",
          color: colors.textColor[100],
          bgcolor: colors.tableHeader,
          border: "none",
        },
        "& .MuiDataGrid-root": {
          fontSize: "14px",
          color: colors.textColor[400],
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none !important",
        },
        "& .MuiDataGrid-cell:focus": {
          outline: "none !important",
          border: "none !important",
        },
        "& .MuiDataGrid-footerContainer": {
          bgcolor: colors.tableHeader,
          border: "none",
        },
      }}
    >
      {children}
    </Card>
  );
};

export default TableCard;
