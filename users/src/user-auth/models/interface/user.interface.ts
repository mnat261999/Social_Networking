import { Role } from "../role.enum";

export interface Users {
    idUser?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    role?: Role;
/*     avas?: Posts[]; */
    createdAt?: Date;
    updatedAt?: Date;
}