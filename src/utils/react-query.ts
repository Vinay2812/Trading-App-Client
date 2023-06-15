import { isAxiosError } from "axios";
import { AxiosResponseType } from "../types/ApiResponse";

export const processReactQueryOutput = <T> (
  response: AxiosResponseType<T>,
  isError: boolean = false
) => {
  if (isError) {
    const value = null;
    const error = isAxiosError(response) ? response.response?.data : response;
    const message = isAxiosError(response)
      ? response.response?.data?.message
      : (response as any)?.message;
    return { value, error, message };
  }
  return { value: response.data.data, message: response.data.message };
};
