import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';



@Entity()
  export class FollowEntity {

    @PrimaryGeneratedColumn("uuid")
    idFollow: string;

    @ManyToOne(() => UserEntity, user => user.follows)
    idUser: UserEntity;

    @ManyToOne(() => UserEntity, user => user.follows)
    idFollower: UserEntity;

}
