import { Users } from "./user.interface";


export interface Avatar {
    idAvatar?:string,
    idUser?:Users,
    avatar?:{},
    createdAt?: Date;
}