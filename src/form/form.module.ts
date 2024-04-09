import { Module } from '@nestjs/common';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form])],
  controllers: [FormController],
  providers: [FormService]
})
export class FormModule {}
