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
  export class LikeEntity {

    @PrimaryGeneratedColumn("uuid")
    idLike: string;
    
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
