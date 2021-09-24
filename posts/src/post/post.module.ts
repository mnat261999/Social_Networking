import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './models/entity/post.entity';
import { MediaEntity } from './models/entity/media.entity';
import { LikeEntity } from './models/entity/like.entity';
import { CommentEntity } from './models/entity/comment.entity';
import { HttpModule } from '@nestjs/axios';
import { UploadService } from './services/upload.service';
import { UploadController } from './controllers/upload.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity,MediaEntity,LikeEntity,CommentEntity]),
    HttpModule
  ], 
  providers: [PostService,JwtGuard,JwtStrategy, UploadService],
  controllers: [PostController, UploadController]
})
export class PostModule {}
