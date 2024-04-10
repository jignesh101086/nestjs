import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FormValues {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    formId: number;

    @Column('json')
    formData: Record<string, any>;

}