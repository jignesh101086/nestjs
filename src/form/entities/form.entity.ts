import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Form {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 36 })
    uniqueId: string;

    @Column({ length: 255 })
    @Index()
    title: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 15 })
    phonenumber: string;

    @Column({ default: false })
    isGraduate: boolean;


}