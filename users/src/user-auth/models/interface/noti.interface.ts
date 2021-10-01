import { Users } from "./user.interface";

export interface Noties {
    idNoti?: string;
    idUserTo?: Users;
    idUserFrom?: Users;
    idEntity?: string;
    notiType?: string;
    opened?: string;
    createdAt?: Date;
    updatedAt?: Date;
}