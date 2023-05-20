import { FC, Suspense } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserTheme from "./UserThemeProvider";
import { Loader } from "./LoaderProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../utils/constants";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import SocketProvider from "./SocketProvider";

interface ProvidersProps {
  children?: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 3,
      // suspense: true,
    },
  },
});

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <SocketProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ProSidebarProvider>
                  <UserTheme>
                    <Suspense fallback={<Loader />}>{children}</Suspense>
                  </UserTheme>
                </ProSidebarProvider>
              </LocalizationProvider>
            </SocketProvider>
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default Providers;
