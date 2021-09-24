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
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
