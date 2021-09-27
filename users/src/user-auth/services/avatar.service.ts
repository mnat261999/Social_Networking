import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvatarEntity } from '../models/entity/avatar.enetity';
import { FollowEntity } from '../models/entity/follow.entity';
import { Avatar } from '../models/interface/avatar.interface';


@Injectable()
export class AvatarService {
    @InjectRepository(AvatarEntity) 
    private readonly avatarRespository:Repository<AvatarEntity>

    async getAvatarCurrent(idUser:any){
        const checkNow = true

        const avaCurrent = await this.avatarRespository.createQueryBuilder('ava')
                                                    .leftJoinAndSelect("ava.idUser", "user")
                                                    .where("user.idUser = :idUser",{idUser})
                                                    .andWhere("ava.checkNow = :checkNow",{checkNow})
                                                    .select(['ava'])
                                                    .getOne()

        return avaCurrent
    }

    async getAvatarById(idAvatar:string){
        const ava = await await this.avatarRespository.findOne({
            select: ['idAvatar'],
            where: {idAvatar:idAvatar},
            relations:['idUser']
          })
        
        return {
            ava:ava,
            idUserAva:ava.idUser.idUser
        }
    }

    async createAvatar(idUser:any,images:Avatar){
        const avas = await this.avatarRespository.find()
        
        if (avas.length > 0){
            console.log('test 1')
            avas.map(async _=>{
                
                const idAvatar = _.idAvatar

                const ava = await this.getAvatarById(idAvatar)

                const idUserCurrent = ava.idUserAva

                
                if(_.checkNow = true && idUserCurrent==idUser){
                    await this.avatarRespository.createQueryBuilder()
                                                .update()
                                                .set({checkNow:false})
                                                .where("idAvatar = :idAvatar",{idAvatar})
                                                .execute()
                }
            })
        }
        const {avatar} = images
        const newAvatar = {
            idUser:idUser, avatar
        }

        const saveAvatar = await this.avatarRespository.save(newAvatar)

        return{
            isSuccess:true,
            message:'Upload avatar success',
            newAvatar:saveAvatar
        }
    }

    async getAvatarByUser(idUser:any){
        const avaCurrent = await this.getAvatarCurrent(idUser)
        
        const listAvas = await this.avatarRespository.createQueryBuilder('ava')
                                                     .leftJoinAndSelect("ava.idUser", "user")
                                                     .where("user.idUser = :idUser",{idUser})
                                                     .select(['ava'])
                                                     .getMany()

        return{
            isSuccess:true,
            avaCurrent:avaCurrent,
            listAvas:listAvas
        }
    }

    async deleteAvatar(idUser:any,idAvatar:string){
        const ava = await this.avatarRespository.createQueryBuilder('ava')
                                                .leftJoinAndSelect("ava.idUser", "user")
                                                .where("user.idUser = :idUser",{idUser})
                                                .andWhere('ava.idAvatar = :idAvatar',{idAvatar})
                                                .select(['ava','user'])
                                                .getOne()
        
        if(ava.checkNow == true)
        {
            
            await this.avatarRespository.createQueryBuilder()
                                        .delete()
                                        .where('idAvatar = :idAvatar',{idAvatar})
                                        .execute()
                    
            return{
                isSuccess:true,
                message:'Ban da xoa anh dai dien. Hay cap nhat lai anh de moi nguoi co the nhan ra ban'
            }
        }
        else{
            await this.avatarRespository.createQueryBuilder()
                                        .delete()
                                        .where('idAvatar = :idAvatar',{idAvatar})
                                        .execute()
            return{
                isSuccess:true,
                message:'Delete successfully'
            } 
        }
    }

}
