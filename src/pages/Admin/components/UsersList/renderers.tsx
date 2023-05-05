import { LaunchOutlined } from "@mui/icons-material";
import { Chip, IconButton, Link, Tooltip } from "@mui/material";

export const renderMoreDetails = ({ row, colors }: any) => {
  return (
    <Tooltip title="More details">
      <Link href={`/admin/users/${row.userId}`}>
        <IconButton
          sx={{
            color: colors.blue[400],
            "&:hover": {
              color: "white",
              backgroundColor: colors.blue[700],
            },
          }}
        >
          <LaunchOutlined />
        </IconButton>
      </Link>
    </Tooltip>
  );
};

export const renderStatus = ({ row, colors }: any) => {
  const statusColors = {
    pending: colors.red[500],
    mapped: colors.indigo[600],
    added: colors.blue[600],
  };

  const statusText = {
    pending: "Pending",
    mapped: "Mapped",
    added: "Added",
  };

  const status = row.isMapped ? "mapped" : row.isAdded ? "added" : "pending";
  return (
    <Chip
      sx={{
        color: colors.white,
        bgcolor: statusColors[status],
        fontWeight: 700,
        fontSize: "12px",
        textTransform: "uppercase",
      }}
      label={statusText[status]}
    />
  );
};
