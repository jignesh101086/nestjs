import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './../src/form/entities/form.entity';
import { FormFields } from './../src/form/entities/formfield.entity';
import { FormValues } from './../src/form/entities/formvalue.entity';

describe('AUth and Form controller (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db.sqlite',
          entities: [Form, FormFields, FormValues],
          synchronize: true,  //Onlt for developer mode
        }),
        AppModule
      ],
      
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should login with correct credentials', async () => {
  
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('access_token');
    accessToken = loginResponse.body.access_token;
  });

  it('should create a form', async () => {
    const formData = { 
      "uniqueId": "uuid",
      "title": "User",
      "name": "string",
      "email": "email",
      "phonenumber": "number",
      "isGraduate": "boolean"
     };
    const response = await request(app.getHttpServer())
      .post('/v1/form')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(formData)
      .expect(HttpStatus.CREATED);
      
    expect(response.body.message).toEqual('Form created successfully');
    
  });

  it('should fill a form', async () => {
    const formData = { 
      "uniqueId": "21d44798-933b-43ea-8568-ca374e74ea53",
      "name": "user name 3",
      "email": "test3@test.com",
      "phonenumber": "+919876543213",
      "isGraduate": true
     };
    const response = await request(app.getHttpServer())
      .post('/v1/fill_data?form_title=User')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(formData)
      .expect(HttpStatus.CREATED);
      
    expect(response.body.message).toEqual('Form filled successfully');
    
  });

});
