import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';



@Entity()
  export class CoverEntity {

    @PrimaryGeneratedColumn("uuid")
    idCover: string;

    @ManyToOne(() => UserEntity, user => user.idUser)
    idUser: UserEntity;

    @Column('simple-json', { default: null })
    cover: {};

    @Column({ default: true })
    checkNow:boolean

}
