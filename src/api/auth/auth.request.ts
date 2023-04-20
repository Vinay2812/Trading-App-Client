import api from "../../utils/api-instance";
import { LoginUserRequest, RegisterUserRequest } from "./request";

export const loginUser = ({
  mobile,
  company_name,
  password,
}: LoginUserRequest) =>
  api.post("/auth/login", { mobile, company_name, password });

export const registerUser = ({ userData, bankData, contactData }: RegisterUserRequest) =>
  api.post("/auth/register", { userData, bankData, contactData });
