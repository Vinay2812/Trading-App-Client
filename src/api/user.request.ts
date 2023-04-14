import {
  handleResponseError,
  handleResponseSuccess,
} from "../utils/server-response";
import api from "../utils/api-instance";


export async function getCompaniesByMobile(mobile: string) {
  try {
    const res = await api.get(`/user/companies/${mobile}`);
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
}

type getAppUserReq = {
  company_name: string,
  mobile: string
}
export async function getAppUser({ company_name, mobile }: getAppUserReq) {
  try {
    const res = await api.get(
      `/user?company_name=${company_name}&mobile=${mobile}`
    );
    return handleResponseSuccess(res);
  } catch (err) {
    return handleResponseError(err);
  }
}
