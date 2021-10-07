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
            idUserTo:idUserTo,//nhận
            idUserFrom:idUserFrom,//gửi
            idEntity:idEntity,
            notiType:notiType
        }

        await this.notiRespository.delete(noti)
        return await this.notiRespository.save(noti)
    }

    async getNoti(idUser:string){
        const listNoti = await this.notiRespository.createQueryBuilder('noti')
                                                   .leftJoinAndSelect('noti.idUserTo','user')
                                                   .leftJoinAndSelect('noti.idUserFrom','userfrom')
                                                   .where('user.idUser = :idUser',{idUser})
                                                   .select(['noti','userfrom'])
                                                   .getMany();
        return {
            isSuccess:true,
            listNoti
        }
                                                   
    }

    async markAsOpen(idNoti:string,idUserTo:string){
        const mark = await this.notiRespository.createQueryBuilder()
        .update()
        .set({opened:true})
        .where('idNoti = :idNoti',{idNoti})
        .andWhere('idUserTo = :idUserTo',{idUserTo})
        .execute()

        return {
            isSuccess:true,
            mark
        }
    }

    async markAsOpenAll(idUserTo:string){
        const mark = await this.notiRespository.createQueryBuilder()
        .update()
        .set({opened:true})
        .where('idUserTo = :idUserTo',{idUserTo})
        .execute()

        return {
            isSuccess:true,
            mark
        }
    }

/*     async deleteNoti(idUserTo:string){
        const mark = await this.notiRespository.createQueryBuilder()
        .update()
        .set({opened:true})
        .where('idUserTo = :idUserTo',{idUserTo})
        .execute()

        return {
            isSuccess:true,
            mark
        }
    } */
}
