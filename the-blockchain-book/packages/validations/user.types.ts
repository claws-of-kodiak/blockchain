export type User = {
  id: string;
  name: string;
  email: string;
  birthDate: Date;
  createdAt: Date;
  isAdmin: boolean;
};

export type ReturnUserProgress = {
  sectionId: string;
  sectionTitle: string;
  sectionPosition: number;
  objectiveId: string;
  objectiveLabel: string;
  objectivePosition: number;
};
