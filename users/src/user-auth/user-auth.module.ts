import { Module } from '@nestjs/common';
import { UserAuthService } from './services/user-auth.service';
import { UserAuthController } from './controllers/user-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/entity/user.entity';
import { AvatarEntity } from './models/entity/avatar.enetity';
import { JwtModule } from '@nestjs/jwt';
import { CoverEntity } from './models/entity/cover.entity';

import { JwtStrategy } from './guards/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { NotificationEntity } from './models/entity/notification.entity';
import { FollowEntity } from './models/entity/follow.entity';
import { FollowsService } from './services/follows.service';
import { FollowsController } from './controllers/follows.controller';





@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,AvatarEntity,CoverEntity,NotificationEntity,FollowEntity]),
    JwtModule.registerAsync({
      useFactory:() =>({
        secret: 'iloveumainguyenanhthu',
        signOptions: {expiresIn: '1d'}
      })
    }),
  ], 
  providers: [UserAuthService,JwtGuard, JwtStrategy, FollowsService],
  controllers: [UserAuthController, FollowsController]
})
export class UserAuthModule {}
