import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
const cloudinary = require('cloudinary')
import toStream = require('buffer-to-stream');


cloudinary.config({
    cloud_name: 'lucy2619288',
    api_key: '171631919197522',
    api_secret: 'oVz-wVpqoAfJolCqNmu5riK4gYo'
})


@Injectable()
export class UploadService {

    async validateType(file: Express.Multer.File){
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            return {isCheck:false}
        } else return {isCheck:true}
    }

    async uploadAvatarUser(
        file: Express.Multer.File,
      ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        
        return new Promise((resolve, reject) => {
          const upload = cloudinary.v2.uploader.upload_stream({folder: "avatar_social"},(error, result) => {
            if (error) return reject(error);
            resolve(result);
          });
        
          toStream(file.buffer).pipe(upload);

        });
      }
    
    async uploadAvatar(file:Express.Multer.File){
        const check = await this.validateType(file)

        if(check.isCheck == false) return {
            isSuccess:false,
            msg:'File format is incorrect.'
        }
        
        const result = await this.uploadAvatarUser(file)
        return{
            isSuccess:true,
            public_id:result.public_id,
            url:result.secure_url
        }
    }
}
