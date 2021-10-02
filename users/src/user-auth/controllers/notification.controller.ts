import { Body, Controller, HttpStatus, Post, Res, UseGuards, Request, Get, Put, Param } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { NotiDto } from '../models/dto/noti.dto';
import { NotificationService } from '../services/notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notiService: NotificationService) { }

    @Post()
    async follow(@Res() res, @Body() noti: NotiDto) {
        try {
            return await this.notiService.insertNoti(noti.idUserTo, noti.idUserFrom, noti.idEntity, noti.notiType)

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    }


    @UseGuards(JwtGuard)
    @Get('list')
    async listFollowing(@Res() res, @Request() req) {
        try {
            const result = await this.notiService.getNoti(req.user.idUser)
            if (result.isSuccess == true)
                return res.status(HttpStatus.OK).json({
                    listNoti:result.listNoti
                })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    }
    
    @UseGuards(JwtGuard)
    @Put('mark_open/:id')
    async markAsOpen(@Param('id') id:string, @Res() res,@Request() req) {
        try {
            const result = await this.notiService.markAsOpen(id,req.user.idUser)
            if (result.isSuccess == true)
                return res.status(HttpStatus.OK).json(result.mark)
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    }

    @UseGuards(JwtGuard)
    @Put('mark_open_all')
    async markAsOpenAll(@Res() res,@Request() req) {
        try {
            const result = await this.notiService.markAsOpenAll(req.user.idUser)
            if (result.isSuccess == true)
                return res.status(HttpStatus.OK).json(result.mark)
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ msg: err.message })
        }
    }
}
