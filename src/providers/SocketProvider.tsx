import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { SERVER_URL } from "../utils/constants";
import {
  UPDATE_AUTHORIZATION,
  UPDATE_ORDER_LIST,
  UPDATE_PUBLISHED_LIST,
  UPDATE_PUBLISH_LIST,
} from "../utils/socket-constants";
import { useQueryClient } from "@tanstack/react-query";
import MaintainencePage from "../components/Errors/MaintainancePage";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { updateUserAuthorizationAction } from "../redux/reducers/user.reducer";

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext)!;
};

const SocketProvider: FC<SocketProviderProps> = (props) => {
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);
  const admin = useAppSelector((state) => state.admin);
  const [serverActive, setServerActive] = useState(true);
  const dispatch = useAppDispatch();
  const socket = useMemo(() => {
    return io(SERVER_URL, {
      reconnectionDelay: 2000,
      extraHeaders: {
        ["user_id"]: user.userId ? user.userId : admin.email ?? "",
      },
    });
  }, [user.userId, admin.email]);

  useEffect(() => {
    socket.on(UPDATE_PUBLISHED_LIST, async () => {
      await queryClient.invalidateQueries(["published-list"]);
    });

    socket.on(UPDATE_PUBLISH_LIST,async () => {
      await queryClient.invalidateQueries(["publish-list"])
    })

    socket.on(UPDATE_AUTHORIZATION, async (accoid) => {
      dispatch(updateUserAuthorizationAction(accoid));
      await queryClient.invalidateQueries(["registration-list"])
      await queryClient.invalidateQueries(["user"])
    });

    socket.on(UPDATE_ORDER_LIST, () => {
      queryClient.invalidateQueries(["order-list"])
    })

    socket.on("connect", () => {
      setServerActive(true);
    });

    socket.on("connect_error", (err) => {
      setServerActive(false);
    });
  }, [socket]);

  if (!serverActive) {
    return <MaintainencePage />;
  }
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
