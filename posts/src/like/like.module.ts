import { Module } from '@nestjs/common';
import { LikeService } from './services/like.service';
import { LikeController } from './controllers/like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './models/entity/like.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity]),
    HttpModule
  ], 
  providers: [LikeService],
  controllers: [LikeController],
  exports: [LikeService]
})
export class LikeModule {}
