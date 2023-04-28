import api from "../../utils/api-instance";

export const getCompaniesByMobile = (mobile: string) =>
  api.get(`/user/companies/${mobile}`);

type getAppUserReq = {
  company_name: string;
  mobile: string;
};
export const getAppUser = ({ company_name, mobile }: getAppUserReq) =>
  api.get(`/user?company_name=${company_name}&mobile=${mobile}`);

export const getUsersList = async () =>
  await api.get("/user/registered-users/details");
