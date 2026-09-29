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
  createdAt: z.date().default(() => new Date()),
});

export type Objective = z.infer<typeof objectiveSchema>;

export type Section = {
  sectionId: string;
  adminId: string;
  title: string;
  createdAt: Date;
  objectives: Objective[];
};
