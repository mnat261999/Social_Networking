import { CommentEntity } from 'src/comment/models/entity/comment.entity';
import { LikeEntity } from 'src/like/models/entity/like.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm';
import { MediaEntity } from './media.entity';


  @Entity()
  export class PostEntity {
    @PrimaryGeneratedColumn("uuid")
    idPost: string;

    @Column()
    content: string;

    @Column()
    idUser: string;

    @Column("simple-array", { default: null})
    reply: []

    @OneToMany(type => MediaEntity, media => media.idPost)
    medias: MediaEntity[];

    @OneToMany(type => LikeEntity, like => like.idPost)
    likes: LikeEntity[];

    @OneToMany(type => CommentEntity, comment => comment.idPost)
    comments: CommentEntity[];
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
