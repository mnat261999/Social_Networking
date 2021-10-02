import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { PostEntity } from 'src/post/models/entity/post.entity';
import { ReplyEntity } from './reply.entity';

@Entity()
  export class CommentEntity {

    @PrimaryGeneratedColumn("uuid")
    idComment: string;
    
    @Column()
    content: string;

    @Column()
    idUserCreator: string;

    @OneToMany(type => ReplyEntity, r => r.idComment)
    replies: ReplyEntity[];

    @ManyToOne(() => PostEntity, post => post.idPost,{onDelete: 'CASCADE'})
    idPost: PostEntity;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date; 

}
