import { Comments } from "./comment.interface";

export interface Replies {
    idReply?:string,
    content?:string,
    idUserCreator?:string,
    idComment?: Comments;
    createdAt?:Date,
    updatedAt?:Date
}