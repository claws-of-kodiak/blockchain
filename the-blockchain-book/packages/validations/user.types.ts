export type User = {
  id: string;
  email: string;
  birthDate: Date;
  passwordHash: string;
  createdAt: Date;
  isAdmin: boolean;
};
