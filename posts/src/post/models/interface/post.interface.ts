import { Medias } from "./media.interface";

export interface Posts {
    idPost?: string;
    content?: string;
    idUser?: string;
    medias?: Medias[];
    media?: Array<
        {
            media?:{
                public_id?: string,
                url?: string
            }
            typeMedia?: string
        }
    >;
    typeMedia?: string;
    createdAt?: Date;
    updatedAt?: Date;
}