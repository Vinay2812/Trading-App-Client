import useLocalStorage from "../hooks/useLocalStorage";

const isDarkTheme: boolean = useLocalStorage().get("theme") === "dark";
