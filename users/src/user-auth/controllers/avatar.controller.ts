import { Controller, Post, Res, UseGuards,Request, Body, HttpStatus, Get, Delete, Param } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { Avatar } from '../models/interface/avatar.interface';
import { AvatarService } from '../services/avatar.service';

@Controller('avatar')
export class AvatarController {
    constructor(private avatarService: AvatarService){}

    @UseGuards(JwtGuard)
    @Post()
    async createAvatar(@Res() res,@Request() req,@Body() avatar:Avatar){
        try {
            const result = await this.avatarService.createAvatar(req.user.idUser,avatar)
            if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({
                    msg:result.message,
                    newAvatar:result.newAvatar
                })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Get()
    async getAvatarByUser(@Res() res,@Request() req){
        try {
            const result = await this.avatarService.getAvatarByUser(req.user.idUser)
            if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({
                    avaCurrent:result.avaCurrent,
                    listAvas:result.listAvas
                })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteAvatar(@Param('id') id:string, @Res() res,@Request() req){
        try {
            const result = await this.avatarService.deleteAvatar(req.user.idUser,id)
            if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({msg:result.message})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}
