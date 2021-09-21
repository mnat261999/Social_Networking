import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserAuthModule } from './user-auth/user-auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
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
    UserAuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
