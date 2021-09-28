import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from '../models/entity/media.entity';
import { PostEntity } from '../models/entity/post.entity';
import { Medias } from '../models/interface/media.interface';
import { Posts } from '../models/interface/post.interface';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private readonly postRespository: Repository<PostEntity>,
        @InjectRepository(MediaEntity) private readonly mediaRespository: Repository<MediaEntity>,
        private httpService: HttpService
    ) { }


    async getUserInfor(idUser: string): Promise<any> {
        const user = await this.httpService.get(`http://localhost:2000/user/get_id/${idUser}`).toPromise()

        return user.data.userInfor
    }

    async addMedia(idPost: any, media: any, typeMedia: string) {
        const newMedia = {
            idPost: idPost, media, typeMedia
        }

        await this.mediaRespository.save(newMedia)
    }


    async validateUserPost(idPost: string, user: any) {
        const postCheck = await this.postRespository.findOne({ idPost })
        console.log(postCheck)
        if (postCheck.idUser != user.idUser)
            return { isCheck: false }
        else
            return {
                isCheck: true,
                idPost: postCheck.idPost
            }
    }


    async createPost(post: Posts, user: any) {
        console.log(post)
        const { content, media, typeMedia } = post

        const newPost: any = {
            content, idUser: user.idUser
        }
        const savePost = await this.postRespository.save(newPost)

        if (media != undefined) {
            await this.addMedia(savePost.idPost, media, typeMedia)
            /*             const newMedia = {
                            idPost:savePost.idPost,media,typeMedia
                        }
                
                        await this.mediaRespository.save(newMedia) */
        }
        return {
            isSuccess: true,
            message: 'Create success',
            newPost: savePost
        }
    }

    async findAllPosts() {
        return await this.postRespository.find()
    }

    async updatePostContent(idPost: string, post: Posts, user: any) {
        const result = await this.validateUserPost(idPost, user)

        if (result.isCheck == false) return {
            isSuccess: false,
            message: 'You can only edit posts created by you'
        }


        await this.postRespository
            .createQueryBuilder()
            .update()
            .set({ content: post.content })
            .where("idPost = :idPost", { idPost })
            .execute();
        return {
            isSuccess: true,
            message: 'Update success'
        }
    }

    async updatePostMedia(idPost: any, medias: Medias, user: any) {

        const result = await this.validateUserPost(idPost, user)

        if (result.isCheck == false) return {
            isSuccess: false,
            message: 'You can only edit posts created by you'
        }

        const { media, typeMedia } = medias

        await this.addMedia(idPost, media, typeMedia)

        const dateTime = new Date();

        await this.postRespository
            .createQueryBuilder()
            .update()
            .set({ updatedAt: dateTime })
            .where("idPost = :idPost", { idPost })
            .execute();
        return {
            isSuccess: true,
            message: 'Update success'
        }
    }

    async deletePost(idPost: string, user: any) {

        const result = await this.validateUserPost(idPost, user)

        if (result.isCheck == false) return {
            isSuccess: false,
            message: 'You can only delete posts created by you'
        }
        else
            await this.postRespository.delete(result.idPost)
        return {
            isSuccess: true,
            message: 'Delete success'
        }
    }

    async deletePostMedia(idMedia: string, user: any) {

        const media = await this.mediaRespository.findOne({
            select: ['idMedia', 'media', 'typeMedia'],
            where: { idMedia: idMedia },
            relations: ['idPost']
        })

        const idPost = media.idPost.idPost

        const result = await this.validateUserPost(idPost, user)

        if (result.isCheck == false) return {
            isSuccess: false,
            message: 'You can only delete media created by you'
        }

        await this.mediaRespository.delete(media)

        const dateTime = new Date();

        await this.postRespository
            .createQueryBuilder()
            .update()
            .set({ updatedAt: dateTime })
            .where("idPost = :idPost", { idPost })
            .execute();

        return {
            isSuccess: true,
            message: 'Delete success'
        }

    }

    async groupPostByUser(idUser: string) {

        const listPosts = await this.postRespository.createQueryBuilder('post')
            .leftJoinAndSelect('post.medias', 'media')
            .leftJoinAndSelect('post.likes', 'like')
            .where('post.idUser = :idUser', { idUser })
            .select(['post', 'media', 'like'])
            .getMany()

        return {
            isSuccess: true,
            listPosts: listPosts
        }

    }

    async getPostById(idPost: string): Promise<any> {
        console.log(idPost)
        const post = await this.postRespository.createQueryBuilder('post')
            .leftJoinAndSelect('post.medias', 'media')
            .where('post.idPost = :idPost', { idPost })
            .select(['post', 'media'])
            .getOne()


        const userCreator = await this.getUserInfor(post.idUser)

        return {
            isSuccess: true,
            post: post,
            userCreator: userCreator
        }
    }
}