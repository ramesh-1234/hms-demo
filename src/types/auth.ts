export type UserRole = "admin" | "doctor" | "reception" | "patient";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  phone?: string;
  avatar?: string;
}
