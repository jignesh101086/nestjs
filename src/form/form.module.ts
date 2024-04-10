import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { FormFields } from './entities/formfield.entity';
import { FormValues } from './entities/formvalue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form, FormFields, FormValues])],
  controllers: [FormController],
  providers: [FormService]
})
export class FormModule {}
