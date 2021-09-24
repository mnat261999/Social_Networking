import { IsNotEmpty } from "class-validator";
import { Posts } from "../interface/post.interface";

export class MediaDto {

    @IsNotEmpty()
    media?:{}

    @IsNotEmpty()
    typeMedia?:string
  }