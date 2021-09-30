import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class NotificationEntity {

    @PrimaryGeneratedColumn("uuid")
    idNoti: string;
    
    @ManyToOne(() => UserEntity, user => user.idUser)
    idUserTo: UserEntity;

    @ManyToOne(() => UserEntity, user => user.idUser)
    idUserFrom: UserEntity;

    @Column("uuid")
    idEntity: string;

    @Column()
    notiType: string;

    @Column()
    content: string;

    @Column({default: false})
    opened: boolean;

}