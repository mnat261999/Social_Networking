import { Posts } from "src/post/models/interface/post.interface";
import { Replies } from "./reply.interface";

export interface Comments {
    idComment?:string,
    content?:string,
    idUserCreator?:string,
    replies?:Replies[],
    idPost?:Posts,
    createdAt?:Date,
    updatedAt?:Date
}