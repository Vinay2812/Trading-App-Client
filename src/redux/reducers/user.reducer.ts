import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserPayload = {
  userId: string | null;
  email: string | null;
  company_name: string | null;
  mobile: string | null;
  accoid: number | null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    email: null,
    company_name: null,
    mobile: null,
    accoid: null,
  } as UserPayload,
  reducers: {
    loginUserAction: (state, action: PayloadAction<UserPayload>) => {
      const { email, company_name, mobile, userId, accoid } = action.payload;
      return {
        ...state,
        userId,
        email,
        company_name,
        mobile,
        accoid,
      };
    },
    updateUserAuthorizationAction: (
      state,
      action: PayloadAction<{ accoid: number }>
    ) => {
      const { accoid } = action.payload;
      return {
        ...state,
        accoid,
      };
    },
    logoutUserAction: (state) => {
      return {
        ...state,
        userId: null,
        email: null,
        company_name: null,
        mobile: null,
        accoid: null,
      };
    },
  },
});

export const {
  loginUserAction,
  logoutUserAction,
  updateUserAuthorizationAction,
} = userSlice.actions;

export default userSlice.reducer;
