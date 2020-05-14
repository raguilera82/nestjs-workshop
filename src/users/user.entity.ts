import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    readonly userId: string;

    @Column({
        unique: true
    })
    readonly name: string;

    constructor(userId: string, name: string) {
        this.userId = userId;
        this.name = name;
    }

}