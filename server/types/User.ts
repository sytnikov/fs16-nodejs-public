export type Role = "admin" | "user";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}