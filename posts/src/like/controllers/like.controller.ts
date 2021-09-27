import { Controller, HttpStatus, Param, Post, Res, UseGuards,Request } from '@nestjs/common';
import { JwtGuard } from 'src/post/guards/jwt.guard';
import { LikeService } from '../services/like.service';

@Controller('like')
export class LikeController {
    constructor(private likeService: LikeService){ }

    @UseGuards(JwtGuard)
    @Post(':id')
    async follow(@Param('id') id:string, @Res() res,@Request() req){
        try {
            const result = await this.likeService.likePost(id, req.user.idUser)
            if(result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({newFollow:result.newLike})
            else if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}
