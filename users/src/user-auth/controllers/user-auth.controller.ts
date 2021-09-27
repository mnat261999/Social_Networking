import { Body, Controller, HttpStatus, Post, Res, UseGuards, Request, Param, Get, Put } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { UserDto } from '../models/dto/user.dto';
import { UserAuthService } from '../services/user-auth.service';
import { Response } from 'express';

@Controller('user')
export class UserAuthController {
    constructor(private userService: UserAuthService){}
    
    @Post('register')
    async register(@Body() user:UserDto,@Res() res){
        const result = await this.userService.register(user)
        if(result.isSuccess){
            res.status(HttpStatus.OK).json({msg:result.message});
        }else{
            return result
        }
    }

    @Post('activation')
    async  activateEmail(@Body('activate_token') body,@Res() res){
        const result = await this.userService.activationEmail(body)
        if(result.isSuccess){
            res.status(HttpStatus.OK).json({msg:result.message});
        }else{
            return result
        }
    }
    @Post('login')
    async login(@Body() user:any,@Res() res:Response,@Request() req){
        const result:any = await this.userService.login(user)

        if(result.isCheck== false){
            res.status(HttpStatus.BAD_REQUEST).json({msg:result.message})
        }else{
            res.cookie('tokenauthen',result.token,{
                httpOnly:true
            })

            
            res.status(HttpStatus.OK).json({
                msg: result.message,
                token:result.token
            })
        }
    }

    @Post('forgot')
    async fogotPassword(@Body('email') email, @Res() res){
        const result = await this.userService.forgotPassword(email)
        if(result.isSuccess == false) return res.status(HttpStatus.BAD_REQUEST).json({msg:result.message})
        else return res.status(HttpStatus.OK).json({msg:result.message})
    }

    @UseGuards(JwtGuard)
    @Post('reset')
    async resetPassword(@Body('password') password, @Request() req, @Res() res){
        const result = await this.userService.resetPassword(password,req.user.idUser)
        if(result.isSuccess){
            res.status(HttpStatus.OK).json({msg:result.message});
        }else{
            return result
        }
    }

    @Post('logout')
    async logout(@Res() res:Response){
        res.clearCookie('tokenauthen')
        res.status(HttpStatus.OK).json({msg: 'Logout!'})
    }

    @Get('all')
    async findAll(@Res() res){
        try {
            const result = await this.userService.findAll()
            if(result.isSuccess) return res.status(HttpStatus.OK).json({userList:result.users})
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }

    @UseGuards(JwtGuard)
    @Get('infor')
    async getUserInfor(@Request() req,@Res() res){
        try {
            
            const result = await this.userService.getUserInfor(req.user.idUser)
            if(result.isSuccess) return res.status(HttpStatus.OK).json({
                userInfor:result.userInfor
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }


    @Get('get_id/:id')
    async getUserId(@Param('id') id:string, @Res() res){
        try {
            const result = await this.userService.getUserById(id)
            if(result.isSuccess) return res.status(HttpStatus.OK).json({
                userInfor:result.userInfor
            })
        } catch (err) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({msg: err.message})
        }
    }
}
