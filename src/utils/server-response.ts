import { AxiosResponse } from "axios";

export function handleResponseError(error: any) {
    let statusCode = error?.response?.status;
    statusCode = statusCode ? statusCode.toString() : null;
    let errorMessage = error?.response?.data?.error?.message;
    if (statusCode === "422") {
      errorMessage = errorMessage[0].message;
    }
    const errorResponse = { success: false, error: errorMessage, data: null, message: null };
    return errorResponse;
  }
  
  export function handleResponseSuccess(res: AxiosResponse) {
    return {
      success: true,
      error: null,
      data: res.data.status === "success" ? res.data.data : "No data found",
      message: res.data.message,
    };
  }