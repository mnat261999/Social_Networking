import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../models/entity/comment.entity';
import { Comments } from '../models/interface/comment.interface';
import { Replies } from '../models/interface/reply.interface';
import { ReplyEntity } from '../models/entity/reply.entity';
import { HttpService } from '@nestjs/axios';
import { PostService } from 'src/post/services/post.service';


@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity) private readonly commentRespository: Repository<CommentEntity>,
        @InjectRepository(ReplyEntity) private readonly replyRespository: Repository<ReplyEntity>,
        private httpService: HttpService,
        private postService:PostService
    ) { }

    async validateUser(id: string, idUser:string,type:string) {
        if(type == 'comment'){
            const check = await this.commentRespository.findOne(id)


            if (check.idUserCreator != idUser)
                {

                    return false
                }
            else
                {
                    return true
                }
        } else if(type == "reply"){
            const check = await this.replyRespository.findOne(id)
            console.log(check)
            if (check.idUserCreator != idUser)
                return false
            else
                return true
        }
    }


    async comment(idPost: string, idUserCreator: string, comment: Comments) {
        const { content } = comment

        const newComment: any = {
            content: content, idUserCreator: idUserCreator, idPost: idPost
        }

        const post = await this.postService.getPostById(idPost)

        const idUserTo = post.post.idUser

        const saveComment = await this.commentRespository.save(newComment)

        this.httpService.post(`http://localhost:2000/notification`,{idUserTo:idUserTo,idUserFrom:idUserCreator,idEntity:idPost,notiType:"comment"}).toPromise()

        return {
            isSuccess: true,
            newComment: saveComment
        }
    }


    async reply(idComment: string, idUserCreator: string, reply: Replies) {
        const { content } = reply
        const createReply: any = {
            content: content, idUserCreator: idUserCreator, idComment: idComment
        }

        const newReply = await this.replyRespository.save(createReply)

        const post = await this.commentRespository.createQueryBuilder('co')
                                                .leftJoinAndSelect('co.idPost','post')
                                                .where("co.idComment = :idComment", { idComment })
                                                .select(['co', 'post.idPost', 'post.idUser'])
                                                .getOne()
        const idPost = post.idPost.idPost
        const idUserTo = post.idPost.idUser

        this.httpService.post(`http://localhost:2000/notification`,{idUserTo:idUserTo,idUserFrom:idUserCreator,idEntity:idPost,notiType:"reply"}).toPromise()

        return {
            isSuccess: true,
            newReply
        }
    }

    async getAllComment() {
        const comments = await this.commentRespository.createQueryBuilder('co')
            .leftJoinAndSelect('co.replies', 'reply')
            .select(['co', 'reply'])
            .getMany()
        return {
            isSuccess: true,
            comments
        }
    }

    async getCommentByPost(idPost: string) {
        const comments = await this.commentRespository.createQueryBuilder('co')
            .leftJoinAndSelect('co.idPost', 'post')
            .leftJoinAndSelect('co.replies', 'reply')
            .where('post.idPost = :idPost', { idPost })
            .select(['co', 'reply'])
            .getMany()
        return {
            isSuccess: true,
            comments
        }
    }

    async editComment(idComment: string, idUserCreator:string, comment: Comments) {
        const { content } = comment
        const update = await this.commentRespository.createQueryBuilder()
            .update()
            .set({ content: content })
            .where('idComment = :idComment', { idComment })
            .andWhere('idUserCreator = :idUserCreator',{idUserCreator})
            .execute()
        
        //console.log({update})

        return {
            isSuccess: true,
            update
        }
    }

    async editReply(idReply: string,idUserCreator:string, reply: Replies) {
        const { content } = reply
        const update = await this.replyRespository.createQueryBuilder()
            .update()
            .set({ content: content })
            .where('idReply = :idReply', { idReply })
            .andWhere('idUserCreator = :idUserCreator',{idUserCreator})
            .execute()

        return {
            isSuccess: true,
            update
        }
    }

    async deleteComment(idComment: string,idUserCreator:string) {
        //console.log({idComment},{idUserCreator})
        const check = await this.validateUser(idComment,idUserCreator,'comment')

        //console.log(check)

        if(check == false) return{
            isSuccess: false,
            message:'You can only delete comments created by you'
        }
        else{
            const test = await this.commentRespository.createQueryBuilder()
                                        .delete()
                                        .where("idComment = :idComment", {idComment})
                                        .execute();


            //console.log({test})

            return{
                isSuccess: true,
                message:'Delete success'
            }
        }
    }

    async deleteReply(idReply: string,idUserCreator:string) {
        const check = await this.validateUser(idReply,idUserCreator,'reply')


        if(check == false) return{
            isSuccess: false,
            message:'You can only delete reply created by you'
        }
        else{
            await this.replyRespository.delete(idReply)

            return{
                isSuccess: true,
                message:'Delete success'
            }
        }
    }
}
