import { Controller, Param, Post, Res, Request, UseGuards, HttpStatus, Get, Delete } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { FollowsService } from '../services/follows.service';

@Controller('follows')
export class FollowsController {
    constructor(private followService: FollowsService){}

    @UseGuards(JwtGuard)
    @Post(':id')
    async follow(@Param('id') id:string, @Res() res,@Request() req){
        try {
            const result = await this.followService.follow(req.user.idUser,id)
            if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({newFollow:result.newFollow})
            else if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @Get('following_list/:id')
    async listFollowing(@Param('id') id:string,@Res() res,@Request() req){
        try {
            const result = await this.followService.getListFollowByUser(id)
            if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({
                    following:result.following,
                    totalFollowing:result.totalFollowing,
                    follower:result.follower,
                    totalFollower:result.totalFollower
                })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Delete('unfollow/:id')
    async unFollow(@Param('id') id:string, @Res() res,@Request() req){
        try {
            const result = await this.followService.cancelFollow(req.user.idUser,id)
            if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({msg:result.message})
            else 
                return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}
