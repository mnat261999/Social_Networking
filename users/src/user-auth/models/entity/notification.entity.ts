import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class NotificationEntity {

    @PrimaryGeneratedColumn("uuid")
    idNoti: string;
    
    @ManyToOne(() => UserEntity, user => user.idUser)
    idUserTo: UserEntity;//user nhận

    @ManyToOne(() => UserEntity, user => user.idUser)
    idUserFrom: UserEntity;//user gửi

    @Column("uuid")
    idEntity: string;

    @Column()
    notiType: string;

/*     @Column()
    content: string; */

    @Column({default: false})
    opened: boolean;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}