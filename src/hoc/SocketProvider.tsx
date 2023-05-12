import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Socket, io } from "socket.io-client";
import { SERVER_URL } from "../utils/constants";
import { UPDATE_PUBLISHED_LIST } from "../utils/socket-constants";
import { useQueryClient } from "@tanstack/react-query";

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider: FC<SocketProviderProps> = (props) => {
  const queryClient = useQueryClient();
  const socket = useMemo(
    () =>
      io(SERVER_URL, {
        transports: ["websocket"],
        reconnectionAttempts: 3,
      }),
    []
  );

  useEffect(() => {
    socket.on(UPDATE_PUBLISHED_LIST, () => {
      queryClient.invalidateQueries(["published-list"])
    })
  },[socket])
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
