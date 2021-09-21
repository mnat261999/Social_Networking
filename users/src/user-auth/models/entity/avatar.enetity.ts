import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';



@Entity()
  export class AvatarEntity {

    @PrimaryGeneratedColumn("uuid")
    idAvatar: string;

    @ManyToOne(() => UserEntity, user => user.idUser)
    idUser: UserEntity;

    @Column('simple-json', { default: null })
    avatar: {};

}
