import { AxiosError, AxiosPromise, isAxiosError } from "axios";
import {
  AxiosResponseType,
  HandleApiAsyncResponseType,
} from "../types/ApiResponse";

export const handleApiAsync = async <T>(promise: AxiosPromise) => {
  let response = {
    status: "pending",
    value: null,
    error: null,
    message: "",
  } as HandleApiAsyncResponseType<T>;

  try {
    const resolve: AxiosResponseType<T> = await promise as any;
    response.value = resolve.data.data;
    response.status = "success";
    response.message = resolve.data.message;
    return response;
  } catch (err: Error | AxiosError | any) {
    if (isAxiosError(err)) {
      response.error = err.response?.data;
      response.message = err.response?.data?.message || "";
    } else {
      response.error = err;
      response.message = err?.message;
    }
    response.status = "error";
    return response;
  }
};
