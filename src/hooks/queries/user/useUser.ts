import useLocalStorage from "../../useLocalStorage";

export const useUser = () => {
  return JSON.parse(useLocalStorage().get("profile"));
};
