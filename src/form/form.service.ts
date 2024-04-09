import { Injectable, NotFoundException } from '@nestjs/common';
import { Form } from './entities/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormService {

    constructor(@InjectRepository(Form) private repo: Repository<Form>) {}

    createForm(formObj: Partial<Form>) {
        console.log(formObj);
        const form =  this.repo.create(formObj);

        return this.repo.save(form)
    }
    
    findOne(id: number) {

        return this.repo.findOne({
            where: {id}
        });
    }

    async updateForm(id: number, formObj: Partial<Form>) {

        const formData = await this.findOne(id);

        if(!formData) {
            throw new NotFoundException('User not found')
        }
        Object.assign(formData, formObj);

        return this.repo.save(formData);
    }

    getForms(title: string) {

        return this.repo.find({
            where: {title}
        })
    }
}
