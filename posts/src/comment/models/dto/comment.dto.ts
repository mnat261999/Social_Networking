import { IsArray, IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class CommentDto {
    @IsNotEmpty()
    content: string;
  }