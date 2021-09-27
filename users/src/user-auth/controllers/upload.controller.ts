import { Controller, HttpStatus, Post, Res, UploadedFile, UseInterceptors ,Request, UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { JwtGuard } from '../guards/jwt.guard';
import { UploadService } from '../services/upload.service';

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService){}

    @UseGuards(JwtGuard)
    @Post('avatar')
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile() files: Express.Multer.File,@Res() res,@Request() req ) {
        try {
          console.log(files)
          const result = await this.uploadService.uploadAvatar(files)
          if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({
                    msg:result.msg
                })
          else (result.isSuccess==true) 
                return res.status(HttpStatus.OK).json({
                  public_id:result.public_id,
                  url:result.url
                })
        } catch (err) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
        
    }
}
