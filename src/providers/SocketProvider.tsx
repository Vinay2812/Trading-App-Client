import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { SERVER_URL } from "../utils/constants";
import { UPDATE_PUBLISHED_LIST } from "../utils/socket-constants";
import { useQueryClient } from "@tanstack/react-query";
import MaintainencePage from "../components/MaintainancePage";

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext)!;
};

const SocketProvider: FC<SocketProviderProps> = (props) => {
  const queryClient = useQueryClient();
  const [serverActive, setServerActive] = useState(true);
  const socket = useMemo(
    () =>
      io(SERVER_URL, {
        reconnectionDelay: 2000,
      }),
    []
  );

  useEffect(() => {
    socket.on(UPDATE_PUBLISHED_LIST, () => {
      queryClient.invalidateQueries(["published-list"]);
    });

    socket.on("connect", () => {
      setServerActive(true);
    });

    socket.on("connect_error", (err) => {
      setServerActive(false);
    });
  }, [socket]);

  // if (!serverActive) {
  //   return <MaintainencePage />;
  // }
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
