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


    async checkFollow(idUser:any, idFollower:any){
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


        if(idUser == idFollower)return{
            isSuccess: false,
            message:"You can't follow yourself"
        }
    
        const result = await this.checkFollow(idUser,idFollower)
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

    async getListFollowByUser(idUser:any){
        const following = await this.followRespository.createQueryBuilder('following')
                                                      .leftJoinAndSelect("following.idFollower", "user")
                                                      .where('following.idUser = :idUser', {idUser})
                                                      .select(['following','user'])
                                                      .getMany();
        const follower = await this.followRespository.createQueryBuilder('following')
                                                     .leftJoinAndSelect("following.idUser", "user")
                                                     .where('following.idFollower = :idUser', {idUser})
                                                     .select(['following','user'])
                                                     .getMany();
        return{
            isSuccess: true,
            following: following,
            totalFollowing:following.length,
            follower:follower,
            totalFollower:follower.length,
        }
    }

    async cancelFollow(idUser:any, idFollowCancel:any){
        const follow = await this.followRespository.createQueryBuilder('follow')
                                                   .where('follow.idUser = :idUser', {idUser})
                                                   .andWhere('follow.idFollower = :idFollowCancel',{idFollowCancel})
                                                   .getOne()

        if(follow == undefined) return {
            isSuccess: true,
            message:"You haven't followed this user yet"
        }
        const idFollow = follow.idFollow
        await this.followRespository.createQueryBuilder()
                                    .delete()
                                    .where("idFollow = :idFollow",{idFollow})
                                    .execute()
        return{
            isSuccess: true,
            message:'Unfollow successful'
        }
    }
}
