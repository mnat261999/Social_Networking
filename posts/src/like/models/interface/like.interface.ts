import { Posts } from "src/post/models/interface/post.interface";

export interface Likes {
    idLike?:string,
    idUserCreator?:string,
    idPost?:Posts,
    createdAt?:Date,
    updatedAt?:Date
}