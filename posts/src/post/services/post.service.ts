import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from '../models/entity/post.entity';
import { Posts } from '../models/interface/post.interface';

@Injectable()
export class PostService {
    constructor(@InjectRepository(PostEntity) private readonly postRespository:Repository<PostEntity>){}

    async createPost(post:Posts,user:any){
        const {content} = post

        const newPost:any = {
            content,idUser:user.idUser
        }
        await this.postRespository.save(newPost)
        return{
            isSuccess:true,
            message:'Create success',
            newPost
        }
    }

    async findAllPosts(){
        return await this.postRespository.find()
    }

    async updatePost(idPost:string, post:Posts,user:any){
        const postUpdate = await this.postRespository.findOne({idPost})
        
        if(postUpdate.idUser!= user.idUser)
            return{
                isSuccess: false,
                message: 'You can only edit posts created by you'
            }

        await this.postRespository
                  .createQueryBuilder()
                  .update()
                  .set({content:post.content})
                  .where("idPost = :idPost", {idPost})
                  .execute();
        return{
            isSuccess: true,
            message: 'Update success'
        }
    }

    async deletePost(idPost:string,user:any){
        const postDelete = await this.postRespository.findOne({idPost})
        
        if(postDelete.idUser!= user.idUser)
            return{
                isSuccess: false,
                message: 'You can only delete posts created by you'
            }
        await this.postRespository.delete(idPost)
        return{
             isSuccess: true,
             message: 'Delete success'
         }
     }
}
