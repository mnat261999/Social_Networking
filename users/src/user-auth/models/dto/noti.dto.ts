import {IsNotEmpty} from "class-validator";

export class NotiDto {
    @IsNotEmpty()
    idUserTo: string;

    @IsNotEmpty()
    idUserFrom: string;

    @IsNotEmpty()
    idEntity: string;

    @IsNotEmpty()
    notiType: string;

  }