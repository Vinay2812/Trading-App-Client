import { Route, Routes } from "react-router-dom";
import "./App.css";
import RedirectProvider from "./hoc/RedirectProvider";
import UserTheme from "./hoc/UserThemeProvider";
import { Container } from "@mui/material";
import { AdminLogin, Login, Register } from "./pages/Auth/components";
import Auth from "./pages/Auth";

function App() {
  return (
    <RedirectProvider>
      <UserTheme>
        <Container
          disableGutters={true}
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "background.default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}
          maxWidth={false}
        >
          <Routes>
            <Route path="/auth">
              <Route path="" element={<Auth />} />
              <Route path="login" element={<Login />}/>
              <Route path="register" element={<Register />} />
              <Route path="admin/login" element = {<AdminLogin />} />
            </Route>
          </Routes>
        </Container>
      </UserTheme>
    </RedirectProvider>
  );
}

export default App;
