import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CommentEntity } from './comment.entity';

@Entity()
  export class ReplyEntity {

    @PrimaryGeneratedColumn("uuid")
    idReply: string;
    
    @Column()
    content: string;

    @Column()
    idUserCreator: string;

    @ManyToOne(() => CommentEntity, post => post.idPost,{onDelete: 'CASCADE'})
    idComment: CommentEntity;
    
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date; 

}
