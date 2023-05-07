import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers/admin.reducer";
import userReducer from "./reducers/user.reducer";

const localStorageMiddleware = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    localStorage.setItem("store", JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  const persistedState = localStorage.getItem("store");
  if (persistedState) {
    return JSON.parse(persistedState); // re-hydrate the store
  }
};

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: reHydrateStore(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
