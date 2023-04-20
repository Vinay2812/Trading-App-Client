import useLocalStorage from "../hooks/useLocalStorage";

export const boxShadow = () => {
  const theme = useLocalStorage().get("theme");
  return theme !== "light"
    ? "0px 2px 5px 5px rgba(0,0,0,0.35)"
    : "0px 2px 5px 5px rgba(0,0,0,0.15)";
};
