import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { PostEntity } from './post.entity';

@Entity()
  export class CommentEntity {

    @PrimaryGeneratedColumn("uuid")
    idComment: string;
    
    @Column()
    content: string;

    @Column()
    idUserCreator: string;

    @ManyToOne(() => PostEntity, post => post.idPost)
    idPost: PostEntity;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date; 

}
