import { RegisterUserRequest } from "../../hooks/api-hooks/auth/use-register-user";
import { SendOtpRequest } from "../../hooks/api-hooks/auth/use-send-otp";
import { UpdatePasswordType } from "../../hooks/api-hooks/auth/use-update-password";
import { UserLoginRequest } from "../../hooks/api-hooks/auth/use-user-login";
import { ValidateOtpRequest } from "../../hooks/api-hooks/auth/use-validate-otp";
import api from "../../utils/api-instance";

export const loginUser = (data: UserLoginRequest) =>
  api.post("/auth/login", data);

export const registerUser = (data: RegisterUserRequest) =>
  api.post("/auth/register", data);

export const sendOtp = async (data: SendOtpRequest) =>
  await api.post("/auth/send-otp", data);

export const validateOtp = async (data: ValidateOtpRequest) =>
  await api.post("/auth/validate-otp", data);

export const updatePassword = async (data: UpdatePasswordType) =>
  api.patch("/auth/password", data);
