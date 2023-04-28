import useLocalStorage from "../../use-local-storage";

export const useUser = () => {
  return JSON.parse(useLocalStorage().get("profile"));
};
