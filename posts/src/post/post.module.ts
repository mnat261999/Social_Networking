import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controller/post.controller';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './models/entity/post.entity';
import { ImageEntity } from './models/entity/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity,ImageEntity]),
  ], 
  providers: [PostService,JwtGuard,JwtStrategy],
  controllers: [PostController]
})
export class PostModule {}
