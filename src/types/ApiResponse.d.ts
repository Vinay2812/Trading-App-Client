export type statusType = "idle" | "pending" | "success" | "error";

export type HandleApiAsyncResponseType<T> = {
  status: statusType;
  value: T;
  error: any;
  message: string;
};

export type ApiDataType<T> = {
  success: boolean;
  error?: any;
  status: number;
  message: string;
  data: T;
};
export type AxiosResponseType<T> = {
  data: ApiDataType<T>;
  status: any;
  statusText?: string;
  headers?: any;
  config?: any;
  request?: any;
}
