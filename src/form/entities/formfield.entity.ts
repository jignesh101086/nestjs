import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FormFields {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    formId: number;

    @Column({ length: 255 })
    fieldName: string;

    @Column({ length: 255 })
    fieldType: string;

}