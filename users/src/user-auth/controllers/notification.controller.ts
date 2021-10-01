import { Body, Controller, HttpStatus, Post, Res, UseGuards,Request } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { NotiDto } from '../models/dto/noti.dto';
import { NotificationService } from '../services/notification.service';

@Controller('notification')
export class NotificationController {
    constructor(private notiService: NotificationService){}

    @Post()
    async follow(@Res() res,@Body() noti:NotiDto){
        try {
            return await this.notiService.insertNoti(noti.idUserTo,noti.idUserFrom,noti.idEntity,noti.notiType)

        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}
