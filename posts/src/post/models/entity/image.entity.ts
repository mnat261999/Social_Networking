import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { PostEntity } from './post.entity';

@Entity()
  export class ImageEntity {

    @PrimaryGeneratedColumn("uuid")
    idImage: string;
    
    @ManyToOne(() => PostEntity, post => post.idPost)
    idPost: PostEntity;

    @Column('simple-json', { default: null })
    image: {};

}
