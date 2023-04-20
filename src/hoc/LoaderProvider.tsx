import { Box } from "@mui/material";
import { FC, createContext, useContext, useMemo, useState } from "react";
import "../styles/loader.css";

interface LoaderProviderProps {
  children: any;
}

const LoaderContext = createContext("");

export const useLoader = () => {
  return useContext(LoaderContext);
};

export const Loader = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        zIndex: 10,
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <main className="loader-main">
        <svg
          className="ip"
          viewBox="0 0 256 128"
          width="256px"
          height="128px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5ebd3e" />
              <stop offset="33%" stopColor="#ffb900" />
              <stop offset="67%" stopColor="#f78200" />
              <stop offset="100%" stopColor="#e23838" />
            </linearGradient>
            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#e23838" />
              <stop offset="33%" stopColor="#973999" />
              <stop offset="67%" stopColor="#009cdf" />
              <stop offset="100%" stopColor="#5ebd3e" />
            </linearGradient>
          </defs>
          <g fill="none" strokeLinecap="round" strokeWidth="16">
            <g className="ip__track" stroke="#ddd" />
            <g className="ip__track" stroke="#ddd">
              <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
              <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
            </g>
            <g strokeDasharray="180 656">
              <path
                className="ip__worm1"
                stroke="url(#grad1)"
                strokeDashoffset="0"
                d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"
              />
              <path
                className="ip__worm2"
                stroke="url(#grad2)"
                strokeDashoffset="358"
                d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"
              />
            </g>
          </g>
        </svg>
      </main>
    </Box>
  );
};

const LoaderProvider: FC<LoaderProviderProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const loaderWrapper = async (promise: Promise<any>) => {
    try {
      setLoading(true);
      const res = await promise;
      return res;
    } finally {
      setLoading(false);
    }
  };

  const value: any = useMemo(() => {
    return { loaderWrapper, isLoading: loading, setLoading };
  }, [loading]);
  return (
    <>
      <LoaderContext.Provider value={value}>
        {loading ? <Loader /> : props.children}
      </LoaderContext.Provider>
    </>
  );
};

export default LoaderProvider;
