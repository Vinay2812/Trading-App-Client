import { FC, lazy, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTodos } from "../../hooks/api-hooks/todos/use-get-todos";
import { Sidebar } from "../Admin/components";
import HeaderCard from "../../components/Cards/HeaderCard";
import Card from "../../components/Cards/Card";
import { Box, Button, Divider, Tab, Tabs } from "@mui/material";
import { useFilteredTodos } from "./use-filtered-todos";
import TodoPanelItem from "./components/TodoPanelItem";
import { useColors } from "../../hooks/use-colors";
import { Add } from "@mui/icons-material";
import CreateOrUpdateModal from "./components/CreateOrUpdateModal";
import TextLoader from "../../components/TextLoader/TextLoader";

const TodoNotFound = lazy(() => import("./components/TodoNotFound"));
interface TodoListProps {}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ px: 3 }}>{children}</Box>}
    </div>
  );
}

const TodoList: FC<TodoListProps> = (props) => {
  const { userId = "" } = useParams();
  const { data, isLoading: todosLoading } = useTodos(userId);
  const [tabValue, setTabValue] = useState(0);
  const colors = useColors();
  const [modalOpen, setModalOpen] = useState(false);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const todos = useMemo(() => {
    if (!data?.value?.todos) {
      return [];
    }
    return data.value.todos;
  }, [data]);

  const pendingHighPriorityTodos = useFilteredTodos(
    todos,
    "high",
    "incomplete"
  );

  const pendingMediumPriorityTodos = useFilteredTodos(
    todos,
    "medium",
    "incomplete"
  );

  const pendingLowPriorityTodos = useFilteredTodos(todos, "low", "incomplete");

  const completedHighPriorityTodos = useFilteredTodos(
    todos,
    "high",
    "complete"
  );

  const completedMediumPriorityTodos = useFilteredTodos(
    todos,
    "medium",
    "complete"
  );

  const completedLowPriorityTodos = useFilteredTodos(todos, "low", "complete");

  const { loading, loadingText } = useMemo(() => {
    return { loading: todosLoading, loadingText: "loading" };
  }, [todosLoading]);

  if (!loading && !todos.length) {
    return <TodoNotFound userId={userId} />;
  }

  return (
    <Sidebar active="Todo List">
      {<TextLoader loading={loading} loadingText={loadingText} />}
      <HeaderCard title="Todo List" subtitle="Here are all your tasks" />
      <Card
        sx={{
          mt: 2,
          height: "calc(100% - 90px)",
          position: "relative",
        }}
      >
        {/* Horizontal tab */}
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          aria-label="basic tabs example"
        >
          <Tab label="Pending Tasks" {...a11yProps(0)} />
          <Tab label="Completed Tasks" {...a11yProps(1)} />
        </Tabs>
        <Divider />
        <Box
          height="calc(100% - 45px)"
          sx={{
            overflowY: "auto",
          }}
        >
          <TabPanel value={tabValue} index={0}>
            <TodoPanelItem
              todos={pendingHighPriorityTodos}
              title="High Priority Tasks"
            />
            <Divider sx={{ borderColor: colors.textColor[500] }} />
            <TodoPanelItem
              todos={pendingMediumPriorityTodos}
              title="Medium Priority Tasks"
            />
            <Divider sx={{ borderColor: colors.textColor[500] }} />
            <TodoPanelItem
              todos={pendingLowPriorityTodos}
              title="Low Priority Tasks"
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <TodoPanelItem
              todos={completedHighPriorityTodos}
              title="High Priority Tasks"
            />
            <Divider sx={{ borderColor: colors.textColor[500] }} />
            <TodoPanelItem
              todos={completedMediumPriorityTodos}
              title="Medium Priority Tasks"
            />
            <Divider sx={{ borderColor: colors.textColor[500] }} />
            <TodoPanelItem
              todos={completedLowPriorityTodos}
              title="Low Priority Tasks"
            />
          </TabPanel>
        </Box>

        <Button
          variant="contained"
          color="indigo"
          sx={{
            position: "absolute",
            right: 35,
            bottom: 20,
            color: colors.textColor[300],
          }}
          endIcon={<Add />}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add Task
        </Button>
      </Card>
      <CreateOrUpdateModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        isCreate={true}
        userId={userId}
      />
    </Sidebar>
  );
};

export default TodoList;
