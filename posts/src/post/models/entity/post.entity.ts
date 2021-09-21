import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm';


  @Entity()
  export class PostEntity {
    @PrimaryGeneratedColumn("uuid")
    idPost: string;

    @Column()
    content: string;

    @Column()
    idUser: string;


    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  }
