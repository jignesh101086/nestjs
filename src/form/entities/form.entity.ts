import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

}