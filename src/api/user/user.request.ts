import { PlaceOrderRequestType } from "../../hooks/api-hooks/user/use-place-order";
import api from "../../utils/api-instance";

export const getCompaniesByMobile = (mobile: string) =>
  api.get(`/user/companies/${mobile}`);

type UserByQueryReq = {
  company_name: string;
  mobile: string;
};
export const getUserByQuery = ({ company_name, mobile }: UserByQueryReq) =>
  api.get(`/user?company_name=${company_name}&mobile=${mobile}`);

export const getUsersList = async () =>
  await api.get("/user/registered-users/details");

export const getAccountMasterCompanies = async () =>
  await api.get("/user/account_master/company-names");

export const getAccountMasterByAccoid = async (accoid: number) =>
  await api.get(`/user/account_master/${accoid}`);

export const getUserProfile = async (userId: string) =>
  api.get(`/user/profile/${userId}`);

export const placeOrder = async (data: PlaceOrderRequestType) =>
  api.post("/user/place-order", data);
