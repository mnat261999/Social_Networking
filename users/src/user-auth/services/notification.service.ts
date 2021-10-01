import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from '../models/entity/notification.entity';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(NotificationEntity) 
        private readonly notiRespository:Repository<NotificationEntity>
    ){}

    async insertNoti(idUserTo:string,idUserFrom:string,idEntity:string,notiType:string){
        const noti:any ={
            idUserTo:idUserTo,
            idUserFrom:idUserFrom,
            idEntity:idEntity,
            notiType:notiType
        }

        await this.notiRespository.delete(noti)
        return await this.notiRespository.save(noti)
    }
}
