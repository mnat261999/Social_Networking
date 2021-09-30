import { Module } from '@nestjs/common';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { CommentEntity } from './models/entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ReplyEntity } from './models/entity/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity,ReplyEntity]),
    HttpModule
  ], 
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
