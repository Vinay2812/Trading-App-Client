import useLocalStorage from "./useLocalStorage";

export const useLogout = () => {
      useLocalStorage().removeAll();
};
