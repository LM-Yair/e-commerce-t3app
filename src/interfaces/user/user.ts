export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserLoginType = Omit<
  User,
  "id" | "createdAt" | "updatedAt" | "name"
>;

export type UserRegisterType = Omit<User, "id" | "createdAt" | "updatedAt">;
