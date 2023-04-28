import useLocalStorage from "./use-local-storage";

export const useLogout = () => {
  useLocalStorage().removeAll();
};
