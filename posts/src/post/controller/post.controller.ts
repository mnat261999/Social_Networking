import { Body, Controller, Post, UseGuards,Request, Res, HttpStatus, Get, Put, Param, Delete } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { JwtGuard } from '../guards/jwt.guard';
import { Role } from '../guards/role.enum';
import { RolesGuard } from '../guards/roles.guard';
import { PostDto } from '../models/dto/post.dto';
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
    async findAllPost(){
        return this.postService.findAllPosts()
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async updatePost(@Param('id') id:string ,@Body() post:PostDto, @Res() res,@Request() req){
        try {
            const result = await this.postService.updatePost(id,post,req.user)

            if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message});
            else if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({msg:result.message});
            else 
                return result
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
}
