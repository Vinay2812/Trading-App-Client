import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserPayload = {
  userId: string | null;
  email: string | null;
  company_name: string | null;
  mobile: string | null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    email: null,
    company_name: null,
    mobile: null,
  } as UserPayload,
  reducers: {
    loginUserAction: (state, action: PayloadAction<UserPayload>) => {
      const { email, company_name, mobile, userId } = action.payload;
      return {
        ...state,
        userId,
        email,
        company_name,
        mobile,
      };
    },
    logoutUserAction: (state) => {
      return {
        ...state,
        userId: null,
        email: null,
        company_name: null,
        mobile: null,
      };
    },
  },
});

export const { loginUserAction, logoutUserAction } = userSlice.actions;

export default userSlice.reducer;
