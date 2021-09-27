import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';



@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": process.env.POSTGRES_HOST,
      "port": parseInt(<string>process.env.POSTGRES_PORT), 
      "username": process.env.POSTGRES_USERNAME,
      "password": process.env.POSTGRES_PASSWORD,
      "database": process.env.POSTGRES_DATABASE,
      "autoLoadEntities": true,
      "synchronize": true
    }),
    PostModule,
    CommentModule,
    LikeModule
  ],
})
export class AppModule {}
