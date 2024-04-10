import { BadRequestException, Injectable, NotFoundException, HttpCode } from '@nestjs/common';
import { Form } from './entities/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormFields } from './entities/formfield.entity';
import { FormValues } from './entities/formvalue.entity';
import { validate, ValidationError } from 'class-validator';
import { ValidationFactory } from './validation.factory/validation.factory';

@Injectable()
export class FormService {

    constructor(
        @InjectRepository(Form) private formRepo: Repository<Form>,
        @InjectRepository(FormFields) private formFieldRepo: Repository<FormFields>,
        @InjectRepository(FormValues) private formValueRepo: Repository<FormValues>,
    ) {}

    async createForm(formData: any) {
        
        const title = formData.title;

        if(title == undefined)
            throw new BadRequestException();

        const form = new Form();
        form.title = title;
    
        const savedForm = await this.formRepo.save(form);

        delete formData.title;

        let formFields=[];
        Object.entries(formData).forEach(([field]) => {
            const formField = new FormFields();
            formField.formId = savedForm.id;
            formField.fieldName = field;
            formField.fieldType = formData[field];
            formFields.push(formField);
        });
        
        await this.formFieldRepo.save(formFields);
    
        return { message: 'Form created successfully' };
    }

    async fillForm(title: string, formData: any) {
        if(title == undefined)
            throw new BadRequestException();

        const form = await this.findFormByTitle(title);

        if(!form) {
            throw new NotFoundException();;
        }
        const formId = form.id;
        const formFiends = await this.formFieldRepo.find({where:{formId: formId}});
        await this.validateFields(formFiends, formData);
        const formValue = new FormValues();
        formValue.formId  = formId;
        formValue.formData = formData
        await this.formValueRepo.save(formValue);
        return { message: 'Form filled successfully' };

    }

    async validateFields(formFiends, formData) {
        let errors: ValidationError[] = [];
        for(const field of formFiends){
            if (formData[field.fieldName]) {

                const value = formData[field.fieldName];
                
                const  validateObj = ValidationFactory.createValidateObj(field.fieldType);
                validateObj.field = value;
                errors = await validate(validateObj);
                if(errors.length > 0)
                    throw new BadRequestException('Validation failed', JSON.stringify(errors));
                
            }
            else{
                throw new BadRequestException('Required field missing');
            }
        }
    }

    findFormByTitle(title: string) {
        return this.formRepo.findOne({where:{title}})
    }

    async getFormValues(title: string) {
        if(title == undefined)
            throw new BadRequestException();

        const form = await this.findFormByTitle(title);

        return this.formValueRepo.find({where:{formId: form.id}});
    }
    
}
