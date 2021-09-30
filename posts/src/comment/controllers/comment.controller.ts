import { Controller, Param, Post, Res, UseGuards,Request, Body, HttpStatus, Put, Get, Delete } from '@nestjs/common';
import { JwtGuard } from 'src/post/guards/jwt.guard';
import { CommentDto } from '../models/dto/comment.dto';
import { CommentService } from '../services/comment.service';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @UseGuards(JwtGuard)
    @Post(':id')
    async comment(@Param('id') id: string, @Res() res, @Request() req,@Body() comment:CommentDto){
        try {
           const result = await this.commentService.comment(id,req.user.idUser,comment)

           //.log(result)
           if(result.isSuccess == true) return res.status(HttpStatus.OK).json({newComment:result.newComment})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Post('reply/:id')
    async reply(@Param('id') id: string, @Res() res, @Request() req,@Body() comment:CommentDto){
        try {
            const result = await this.commentService.reply(id,req.user.idUser,comment)
            if(result.isSuccess == true) return res.status(HttpStatus.OK).json({newReply:result.newReply})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Get('get_all')
    async getAll(@Res() res, @Request() req){
        try {
            const result = await this.commentService.getAllComment()
            if(result.isSuccess == true) return res.status(HttpStatus.OK).json({comments:result.comments})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Get('get_post/:id')
    async getByPost(@Param('id') id: string,@Res() res, @Request() req){
        try {
            const result = await this.commentService.getCommentByPost(id)
            if(result.isSuccess == true) return res.status(HttpStatus.OK).json({comments:result.comments})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async editComment(@Param('id') id: string,@Res() res, @Request() req,@Body() comment:CommentDto){
        try {
            const result = await this.commentService.editComment(id,req.user.idUser,comment)
            if(result.isSuccess == true) return res.status(HttpStatus.OK).json(result.update)
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Put('reply/:id')
    async editReply(@Param('id') id: string,@Res() res, @Request() req,@Body() comment:CommentDto){
        try {
            const result = await this.commentService.editReply(id,req.user.idUser,comment)
            if(result.isSuccess == true) return res.status(HttpStatus.OK).json(result.update)
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteComment(@Param('id') id: string,@Res() res, @Request() req){
        try {
            const result = await this.commentService.deleteComment(id,req.user.idUser)
            if(result.isSuccess == false) return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message})
            else return res.status(HttpStatus.OK).json({msg:result.message})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Delete('reply/:id')
    async deleteReply(@Param('id') id: string,@Res() res, @Request() req){
        try {
            const result = await this.commentService.deleteReply(id,req.user.idUser)
            if(result.isSuccess == false) return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message})
            else return res.status(HttpStatus.OK).json({msg:result.message})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}
