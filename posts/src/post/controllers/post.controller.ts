import { Body, Controller, Post, UseGuards,Request, Res, HttpStatus, Get, Put, Param, Delete, Query } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { JwtGuard } from '../guards/jwt.guard';
import { Role } from '../guards/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { MediaDto } from '../models/dto/media.dto';
import { PostDto } from '../models/dto/post.dto';
import { Posts } from '../models/interface/post.interface';
import { PostService } from '../services/post.service';

@Controller('post')
export class PostController {
    constructor(private postService:PostService){}
    
    @Roles(Role.USER)
    @UseGuards(JwtGuard, RolesGuard)
    @Post('create')
    async create(@Body() post:PostDto,@Request() req, @Res() res){
        
        const result = await this.postService.createPost(post,req.user)
        try {
            if(result.isSuccess)
                return res.status(HttpStatus.OK).json({
                    newPost:result.newPost,
                    msg:result.message
                });
           else
                return result
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @Get('getall')
    async findAllPost(@Query() query:any, @Res() res){
       try {
        const result = await this.postService.findAllPosts(query)
        return res.status(HttpStatus.OK).json({
            posts:result.posts,
            total: result.total,
            result: result.result
        });
       } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
       }
    }

    @UseGuards(JwtGuard)
    @Put('update_content/:id')
    async updatePost(@Param('id') id:string ,@Body() post:PostDto, @Res() res,@Request() req){
        try {
            const result = await this.postService.updatePostContent(id,post,req.user)

            if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message});
            else if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({msg:result.message});
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Put('update_media/:id')
    async updatePostImage(@Param('id') id:string,@Body() media:Posts,@Res() res,@Request() req){
        try {
            
            const result = await this.postService.updatePostMedia(id,media,req.user)
            if(result.isSuccess==true) 
                    return res.status(HttpStatus.OK).json({msg:result.message})
            else if(result.isSuccess==false) 
                    return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message});
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }



    @UseGuards(JwtGuard)
    @Delete(':id')
    async deletePost(@Param('id') id:string, @Res() res,@Request() req){
        
        try {
            
            const result = await this.postService.deletePost(id,req.user)

            if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message});
            else if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({msg:result.message})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Delete('delete_media/:id')
    async deleteMediaPost(@Param('id') id:string, @Res() res,@Request() req){
        
        try {
            
           const result = await this.postService.deletePostMedia(id,req.user)
             if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message});
            else if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({msg:result.message});
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Get('listByUser/:id')
    async groupPostByUser(@Param('id') id:string,@Res() res,@Request() req){
        try {

            const result = await this.postService.groupPostByUser(id)

            if(result.isSuccess==true)
                return res.status(HttpStatus.OK).json({listPosts:result.listPosts});
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    
    @Get('get_id/:id')
    async getPostById(@Param('id') id:string, @Res() res,@Request() req){
        try {
            
            //const token = req.cookies['tokenauthen']
            const result = await this.postService.getPostById(id)
            if(result.isSuccess==true)
                return res.status(HttpStatus.BAD_REQUEST).json({
                    post:result.post,
                    userCreator:result.userCreator
                });
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}
