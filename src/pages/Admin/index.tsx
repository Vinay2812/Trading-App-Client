import { FC, useMemo, useState } from "react";
import { Sidebar } from "./components";
import { useColors } from "../../hooks/use-colors";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Card from "../../components/Cards/Card";
import {
  CheckBox,
  CheckBoxOutlineBlankOutlined,
  TrendingDown,
  TrendingUp,
} from "@mui/icons-material";
import HeaderCard from "../../components/Cards/HeaderCard";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface AdminProps {}

interface AdminHomeCardProps {
  label: string;
  value: string;
  trend: "up" | "down" | "none";
  customIcon?: any;
}

const AdminHomeCard = ({
  label,
  value,
  trend,
  customIcon,
}: AdminHomeCardProps) => {
  const colors = useColors();
  const renderTrendBox = (trend: "up" | "down") => {
    return (
      <Box
        sx={{
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: trend === "up" ? colors.green[600] : colors.red[500],
          borderRadius: "12px",
        }}
      >
        {trend === "up" ? <TrendingUp /> : <TrendingDown />}
      </Box>
    );
  };
  return (
    <Grid item lg={3} md={6}>
      <Card
        sx={{
          display: "flex",
          width: "100%",
          // justifyContent: "space-around",
          gap: "32px",
        }}
      >
        <Box width="100%">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "500",
                color: colors.textColor[100],
              }}
            >
              {value}
            </Typography>
            {customIcon ?? (trend !== "none" && renderTrendBox(trend))}
          </Box>
          <Typography
            sx={{
              color: colors.blue[500],
              textTransform: "uppercase",
              mt: 1,
              overflow: "clip",
              width: "100%",
              whiteSpace: "nowrap",
              textOverflow: "clip",
            }}
            variant="h6"
          >
            {label}
          </Typography>
        </Box>
      </Card>
    </Grid>
  );
};

const icon = <CheckBoxOutlineBlankOutlined fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

function WeekdayAutocomplete({
  value,
  onChange,
  disabled,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  disabled: boolean;
}) {
  const options = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      value={value}
      disabled={disabled}
      // getOptionLabel={(option) => option.title}
      onChange={(e, value) => onChange(value)}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Pause Trading on Days" placeholder="" />
      )}
    />
  );
}

const Admin: FC<AdminProps> = (props) => {
  const colors = useColors();
  const [editTime, setEditTime] = useState(false);
  const dummyData = [
    {
      label: "Active users",
      value: "100k",
      trend: "up",
    },
    {
      label: "Registered users",
      value: "100k",
      trend: "up",
    },
    {
      label: "Pending users",
      value: "10k",
      trend: "up",
    },
    {
      label: "Publish List",
      value: "1.5k",
      trend: "none",
    },
    {
      label: "Published Items",
      value: "2k",
      trend: "down",
    },
    {
      label: "Active Published Items",
      value: "1.5k",
      trend: "up",
    },
    {
      label: "Inactive Published Items",
      value: "5k",
      trend: "down",
    },
    {
      label: "Total Orders",
      value: "50k",
      trend: "up",
    },
  ] as AdminHomeCardProps[];

  const [adminData, setAdminData] = useState({
    email: "vinaysarda2812@gmail.com",
    role: "admin",
    name: "Vinay Sarda",
    isEnabled: false,
  });
  const now = useMemo(() => new Date(), []);
  const [tradeTimingData, setTradeTimingData] = useState({
    startTime: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      10,
      0,
      0,
      0
    ),
    endTime: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      17,
      0,
      0,
      0
    ),
    offDays: ["Saturday", "Sunday"],
  });

  return (
    <Sidebar active="Home">
      <HeaderCard title="Home" subtitle="Welcome to admin home page" />
      <Card sx={{ mt: 2 }}>
        <Box width="100%">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              width: "100%",
              // justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                color: colors.blue[400],
                textTransform: "uppercase",
                mt: 1,
                fontWeight: "500",
              }}
              variant="h5"
            >
              Trade Timings
            </Typography>
            <TimePicker
              label="Start Time"
              value={dayjs(tradeTimingData.startTime)}
              onChange={(value) =>
                setTradeTimingData((prev) => ({
                  ...prev,
                  startTime: value!.toDate(),
                }))
              }
              disabled={!editTime}
            />
            <TimePicker
              label="End Time"
              onChange={(value) =>
                setTradeTimingData((prev) => ({
                  ...prev,
                  endTime: value!.toDate(),
                }))
              }
              value={dayjs(tradeTimingData.endTime)}
              disabled={!editTime}
            />
            <WeekdayAutocomplete
              value={tradeTimingData.offDays}
              onChange={(value: string[]) =>
                setTradeTimingData((prev) => ({ ...prev, offDays: value }))
              }
              disabled={!editTime}
            />
            <Button
              variant="contained"
              color={editTime ? "green" : "red"}
              sx={{
                width: 100,
                height: 40,
              }}
              onClick={() => setEditTime((prev) => !prev)}
            >
              {editTime ? "Save" : "Edit"}
            </Button>
          </Box>
        </Box>
      </Card>
      <Card
        sx={{
          my: 2,
          height: "50vh",
          overflowY: "auto",
          position: "relative",
          p: 0,
        }}
      >
        <HeaderCard
          title="Admin Access"
          subtitle="Admin access is provided to following users"
        />
        <Button
          sx={{
            position: "absolute",
            right: "20px",
            bottom: "20px",
          }}
          variant="contained"
          color="violet"
        >
          Add access
        </Button>
      </Card>
      <Grid container spacing={2}>
        {dummyData.map((data, idx) => {
          return <AdminHomeCard {...data} key={`${data.label}`} />;
        })}
      </Grid>
    </Sidebar>
  );
};

export default Admin;
