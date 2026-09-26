export type Objective = {
  objectiveId: string;
  sectionId: string;
  label: string;
  description: string;
  createdAt: Date;
};

export type Section = {
  sectionId: string;
  adminId: string;
  title: string;
  createdAt: Date;
  objectives: Objective[];
};
