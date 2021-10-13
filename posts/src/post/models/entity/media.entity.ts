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
  export class MediaEntity {

    @PrimaryGeneratedColumn("uuid")
    idMedia: string;
    
    @ManyToOne(() => PostEntity, post => post.medias,{onDelete: 'CASCADE'})
    idPost: PostEntity;

    @Column('simple-json', { default: null })
    media: {};

    @Column()
    typeMedia: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}
