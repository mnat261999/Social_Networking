import { Controller, Post, Res, UploadedFile, UseGuards, UseInterceptors,Request, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../guards/jwt.guard';
import { UploadService } from '../services/upload.service';

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService){}

    @UseGuards(JwtGuard)
    @Post('image')
    @UseInterceptors(FileInterceptor('files'))
    async uploadImageFile(@UploadedFile() files: Express.Multer.File,@Res() res,@Request() req ) {
        try {
          const result = await this.uploadService.uploadImage(files)
          
          console.log({result})
           if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({
                    msg:result.msg
                })
           else 
                return res.status(HttpStatus.OK).json({
                  public_id:result.public_id,
                  url:result.url,
                  typeMedia:result.typeMedia
                })
        } catch (err) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
        
    }


    @UseGuards(JwtGuard)
    @Post('video')
    @UseInterceptors(FileInterceptor('files'))
    async uploadVideoFile(@UploadedFile() files: Express.Multer.File,@Res() res,@Request() req ) {
        try {
          const result = await this.uploadService.uploadVideo(files)
          
          if(result.isSuccess==true){
            return res.status(HttpStatus.OK).json({
              public_id:result.public_id,
              url:result.url,
              typeMedia:result.typeMedia
            })
          }
          
/*             if(result.isSuccess==false)
                return res.status(HttpStatus.BAD_REQUEST).json({
                    msg:result.msg
                })
           else 
                return res.status(HttpStatus.OK).json({
                  public_id:result.public_id,
                  url:result.url
                }) */
        } catch (err) {
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
        
    }
}
