import { RouterModule } from "@nestjs/core";
import { AvatarEntity } from "./avatar.enetity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Role } from "../role.enum";
import { CoverEntity } from "./cover.entity";
import { FollowEntity } from "./follow.entity";


@Entity()
@Unique(['email'])
export class UserEntity{
    @PrimaryGeneratedColumn("uuid")
    idUser: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column({select: false})
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER})
    role: Role;


    @OneToMany(type => AvatarEntity, ava => ava.idUser)
    avas: AvatarEntity[];

    @OneToMany(type => CoverEntity, cover => cover.cover)
    cover: CoverEntity[];

/*     @ManyToMany(() => UserEntity,{ cascade: true })
    @JoinTable()
    follow: UserEntity[]; */

/*     @ManyToMany(() => UserEntity,{ cascade: true })
    @JoinTable()
    following: UserEntity[]; */

    @OneToMany(() => FollowEntity, follow => follow.idUser)
    follows: FollowEntity[];

    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}