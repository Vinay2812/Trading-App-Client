import { z } from "zod";

export const stringOrNumberSchema = z
  .union([z.string(), z.number()])
  .transform((val) => (typeof val === "string" ? parseFloat(val) : val));
