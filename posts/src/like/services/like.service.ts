import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/post/models/interface/post.interface';
import { PostService } from 'src/post/services/post.service';
import { Repository } from 'typeorm';
import { LikeEntity } from '../models/entity/like.entity';
import { Likes } from '../models/interface/like.interface';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(LikeEntity) private readonly likeRespository: Repository<LikeEntity>,
        private httpService: HttpService,
        private postService:PostService
    ) { }

    async findAllLike() {
        const likes = await this.likeRespository.find()

        return likes
    }
    async checkLike(idPost: string, idUser: string) {

        const likes = await this.findAllLike()
        //console.log(likes.length)
        if (likes.length == 0) return true
        const like = await this.likeRespository.createQueryBuilder('like')
            .leftJoinAndSelect('like.idPost', 'post')
            .where('like.idUserCreator = :idUser', { idUser })
            .andWhere('post.idPost = :idPost', { idPost })
            .getOne()
        //console.log({ like })
        if (like != undefined) return false
        else return true
    }

    async likePost(idPost: string, idUser: string) {

    
        const check = await this.checkLike(idPost, idUser)

        if (check == false) return {
            isSuccess: false,
            message: 'This post has been liked by you'
        }

        const post = await this.postService.getPostById(idPost)

        const idUserTo = post.post.idUser

        const newLike: any = {
            idPost: idPost, idUserCreator: idUser
        }

        const saveLike = await this.likeRespository.save(newLike)

        this.httpService.post(`http://localhost:2000/notification`,{idUserTo:idUserTo,idUserFrom:idUser,idEntity:idPost,notiType:"like"}).toPromise()


        return {
            isSuccess: true,
            newLike: saveLike
        }
    }

    async unLike(idPost: string, idUser: string) {
        console.log(idUser)
        const like = await this.likeRespository.createQueryBuilder('like')
                                                .leftJoinAndSelect('like.idPost', 'post')
                                                .where('like.idUserCreator = :idUser', { idUser })
                                                .andWhere('post.idPost = :idPost', { idPost })
                                                .getOne()
        if (like == undefined) return {
            isSuccess: true,
            message: "You haven't liked this post yet"
        }

        const idLike = like.idLike

        await this.likeRespository.createQueryBuilder()
                                    .delete()
                                    .where("idLike = :idLike",{idLike})
                                    .execute()
        return{
            isSuccess: true,
            message:'Unlike successful'
        }
    }
}
