import z from "zod";

export const newObjectiveSchema = z.object({
  label: z.string().min(1, "Label required"),
  description: z.string().min(1, "Description required"),
});

export const objectiveSchema = z.object({
  objectiveId: z.string(),
  sectionId: z.string(),
  label: z.string().min(1, "Label required"),
  description: z.string().min(1, "Description required"),
  position: z.coerce.number().min(1, "Postion required"),
  createdAt: z.date().default(() => new Date()),
});

export type Objective = z.infer<typeof objectiveSchema>;

export const newSectionSchema = z.object({
  title: z.string().min(1, "Title required"),
});

export const sectionSchema = z.object({
  sectionId: z.string().min(1, "adminId required"),
  adminId: z.string().min(1, "adminId required"),
  title: z.string().min(1, "Title required"),
  position: z.coerce.number().min(1, "Postion required"),
  createdAt: z.date().default(() => new Date()),
  objectives: z.array(objectiveSchema),
});

export type Section = z.infer<typeof sectionSchema>;
