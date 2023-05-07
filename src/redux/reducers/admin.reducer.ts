import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AdminPayload = {
  isAdmin: boolean;
  email: string | null;
  picture: string | null;
  name: string | null;
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdmin: false,
    email: null,
    picture: null,
    name: null,
  } as AdminPayload,
  reducers: {
    loginAdminAction: (state, action: PayloadAction<AdminPayload>) => {
      return {
        ...state,
        isAdmin: true,
        email: action.payload.email,
        picture: action.payload.picture,
        name: action.payload.name,
      };
    },
    logoutAdminAction: (state) => {
      return {
        ...state,
        isAdmin: false,
        email: null,
        picture: null,
        name: null,
      };
    },
  },
});

export const { loginAdminAction, logoutAdminAction } = adminSlice.actions;

export default adminSlice.reducer;
