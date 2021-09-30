import { Medias } from "./media.interface";

export interface Posts{
    idPost?: string;
    content?: string;
    idUser?: string;
    medias?:Medias[];
    media?:{};
    typeMedia?:string;
    createdAt?: Date;
    updatedAt?: Date;
}