import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  role: z.string().min(1, "Role is required").max(100),
  skills: z.string().max(200).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export const builderTitleSchema = z.object({
  name: z.string().min(1).max(80),
  role: z.string().min(1).max(100),
  skills: z.string().max(200).optional(),
});

export const cardUploadSchema = z.object({
  imageDataUrl: z.string().startsWith("data:image/"),
  name: z.string().min(1).max(80),
});
