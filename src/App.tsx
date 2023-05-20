import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import Providers from "./providers/Providers";
import { AdminRoutes, AuthRoutes, TodoRoutes, UserRoutes } from "./routes";

const styleObj = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "background.default",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

function App() {
  return (
    <Providers>
      <CssBaseline />
      <Container disableGutters={true} sx={styleObj} maxWidth={false}>
        <AuthRoutes />
        <AdminRoutes />
        <TodoRoutes />
        <UserRoutes />
      </Container>
    </Providers>
  );
}

export default App;
