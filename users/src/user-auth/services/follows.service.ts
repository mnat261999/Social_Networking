import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FollowEntity } from '../models/entity/follow.entity';

@Injectable()
export class FollowsService {
    constructor(
        @InjectRepository(FollowEntity) 
        private readonly followRespository:Repository<FollowEntity>
    ){}


    async checkUser(idUser:any, idFollower:any){
        const check = await this.followRespository.createQueryBuilder('follow')
                                                  .where('follow.idUser = :idUser', {idUser})
                                                  .andWhere('follow.idFollower = :idFollower', {idFollower})
                                                  .getOne()
        if(check != undefined)           
            return{
                isCheck: false,
                message: 'This person has been followed by you'
            } 
        else
            return {
                isCheck:true
            }     
    }
    
    async follow(idUser:any, idFollower:any){
    
        const result = await this.checkUser(idUser,idFollower)
        if(result.isCheck == false) return{
            isSuccess: false,
            message:result.message
        }


        const newFollow = this.followRespository.create({idUser:idUser,idFollower:idFollower})
        const saveFollow = await this.followRespository.save(newFollow)

        return{
            isSuccess: true,
            newFollow: saveFollow
        }
      
    }

    async getFollowingByUser(idUser:any){
        const following = await this.followRespository.createQueryBuilder('following')
                                                      .leftJoinAndSelect("following.idFollower", "user")
                                                      .where('following.idUser = :idUser', {idUser})
                                                      .select(['following','user'])
                                                      .getMany();
        return{
            isSuccess: true,
            following: following
        }
    }
}
