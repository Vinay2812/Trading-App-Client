import { ZodSchema } from "zod";
import { AxiosResponseType } from "../types/ApiResponse";
import { processReactQueryOutput } from "./react-query";

export async function parseApiData<T>(
  schema: ZodSchema,
  data: AxiosResponseType<T>
) {
  const processedData = await processReactQueryOutput<T>(data);
  if (!processedData.value) return processedData;
  if (processedData.value instanceof Array) {
    processedData.value = processedData.value.map((d) => schema.parse(d)) as T;
  } else {
    processedData.value = schema.parse(processedData.value);
  }
  return processedData;
}