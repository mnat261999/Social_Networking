import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/entity/user.entity';
import * as bcrypt from 'bcrypt'
import { Users } from '../models/interface/user.interface';
import { sendEmail } from '../utils/sendEmail';
import { FollowEntity } from '../models/entity/follow.entity';
import { compareArr } from '../utils/checkArr';


@Injectable()
export class UserAuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRespository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        @InjectRepository(FollowEntity)
        private readonly followRespository: Repository<FollowEntity>

    ) { }

    async register(user: Users) {
        const { firstName, lastName, email, phone, password } = user

        const find = await this.userRespository.findOne({ email: email })

        if (find != undefined) return {
            isSuccess: false,
            message: 'This email does exist'
        }



        const passwordHash = await bcrypt.hash(password, 12)
        const newUser = {
            firstName, lastName, email, phone, password: passwordHash
        }
        const activation_token = this.jwtService.sign(newUser)
        const url = `http://localhost:3000/user/activate/${activation_token}`
        sendEmail(email, url, "Verify your email address")
        return {
            isSuccess: true,
            message: 'Register Success! Please activate your email to start.'
        }
    }

    async activationEmail(activation_token: string) {
        const user = await this.jwtService.verify(activation_token, <any>process.env.JWT_SECRECT)
        await this.userRespository.save(user)
        return {
            isSuccess: true,
            message: 'Account has been activated!'
        }
    }

    async check(email: string, password: string) {
        const user = await this.userRespository.findOne(
            {
                select: ['idUser', 'firstName', 'lastName', 'email', 'password', 'role'],
                where: { email }
            })

        if (!user) {
            return {
                isCheck: false,
                message: 'This email does not exist'
            }
        } else {
            const checkPass = await bcrypt.compare(password, user.password)
            if (!checkPass) {
                return {
                    isCheck: false,
                    message: 'Password is incorrect'
                }
            } else {
                return {
                    isCheck: true,
                    user
                }
            }
        }
    }

    async login(userLogin: Users) {
        const { email, password } = userLogin
        const result = await this.check(email, password)
        if (result.isCheck != true) { return result }

        const user = result.user
        const token = this.jwtService.sign({ user })
        return {
            message: 'Login success!',
            token
        }
    }

    async forgotPassword(email: string) {
        const user = await this.userRespository.findOne({ email })
        if (!user) {
            return {
                isSuccess: false,
                message: 'This email does not exist'
            }
        }
        const reset_token = this.jwtService.sign({ user })

        const url = `http://localhost:8080/user/reset/${reset_token}`

        sendEmail(email, url, "Reset your password")

        return {
            isSuccess: true,
            message: 'Re-send the password, please check your email.'
        }

    }

    async resetPassword(password: string, idUser: string) {
        const passwordHash = await bcrypt.hash(password, 12)
        await this.userRespository
            .createQueryBuilder()
            .update()
            .set({ password: passwordHash })
            .where("idUser = :idUser", { idUser })
            .execute();
        return {
            isSuccess: true,
            message: 'Password successfully changed!'
        }
    }

    async findAllByUser(idUser: string) {
        /* const users = await this.userRespository.find() */

        const users = await this.userRespository.createQueryBuilder('user')
                                    .leftJoinAndSelect('user.avas','ava')
                                    .select(['user', 'ava'])
                                    .getMany()
        let userFollow = []

        const following = await this.followRespository.createQueryBuilder('following')
            .leftJoinAndSelect("following.idFollower", "user")
            .where('following.idUser = :idUser', { idUser })
            .select(['following', 'user'])
            .getMany();


        following.map(_ => {
            userFollow.push(_.idFollower)
        })

        var onlyInA = users.filter(compareArr(userFollow));
        var onlyInB = userFollow.filter(compareArr(users));


        const result = onlyInA.concat(onlyInB);

        const userList = result.filter(_ => _.idUser != idUser);

        return {
            isSuccess: true,
            users: userList
        }
    }

    async findAll() {
        return await this.userRespository.find({
            relations: ['avas']
        })
    }

    async getUserInfor(idUser: string) {
        /*           const userInfor = await this.userRespository.findOne({
                    select: ['idUser','firstName','lastName', 'email','phone', 'password', 'role', 'createdAt','updatedAt'],
                    where: {idUser:idUser},
                  }) */

        const checkNow = true

        const userInfor = await this.userRespository.createQueryBuilder('user')
            .leftJoinAndSelect('user.avas', 'ava')
            .where('user.idUser = :idUser', { idUser })
            .select(['user.idUser', 'user.firstName', 'user.lastName', 'user.email', 'user.phone', 'user.role', 'user.createdAt', 'user.updatedAt', 'ava'])
            .getOne()

        if (userInfor.avas.length == 0) {
            return {
                isSuccess: true,
                userInfor: userInfor
            }
        }

        const user = await this.userRespository.createQueryBuilder('user')
            .leftJoinAndSelect('user.avas', 'ava')
            .where('user.idUser = :idUser', { idUser })
            .andWhere('ava.checkNow = :checkNow', { checkNow })
            .select(['user.idUser', 'user.firstName', 'user.lastName', 'user.email', 'user.phone', 'user.role', 'user.createdAt', 'user.updatedAt', 'ava'])
            .getOne()

        return {
            isSuccess: true,
            userInfor: user
        }

    }


    async getUserById(idUser: string) {
        /*           const userInfor = await this.userRespository.findOne({
                    select: ['idUser','firstName','lastName', 'email','phone', 'password', 'role', 'createdAt','updatedAt'],
                    where: {idUser:idUser},
                  }) */

        const checkNow = true

        const userInfor = await this.userRespository.createQueryBuilder('user')
            .leftJoinAndSelect('user.avas', 'ava')
            .where('user.idUser = :idUser', { idUser })
            .select(['user.idUser', 'user.firstName', 'user.lastName', 'user.email', 'user.phone', 'user.role', 'user.createdAt', 'user.updatedAt', 'ava'])
            .getOne()

        if (userInfor.avas.length == 0) {
            return {
                isSuccess: true,
                userInfor: userInfor
            }
        }

        const user = await this.userRespository.createQueryBuilder('user')
            .leftJoinAndSelect('user.avas', 'ava')
            .where('user.idUser = :idUser', { idUser })
            .andWhere('ava.checkNow = :checkNow', { checkNow })
            .select(['user.idUser', 'user.firstName', 'user.lastName', 'user.email', 'user.phone', 'user.role', 'user.createdAt', 'user.updatedAt', 'ava'])
            .getOne()

        return {
            isSuccess: true,
            userInfor: user
        }

    }

    async updateUser(idUser: string, user:Users){
        //console.log(user)
        const {firstName, lastName, phone} = user

        const update = await this.userRespository.createQueryBuilder()
        .update()
        .set({firstName,lastName,phone})
        .where("idUser = :idUser", {idUser})
        .execute();

        console.log(update)
        return {
            isSuccess: true,
            update
        }
    }

}
