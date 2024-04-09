import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './../src/form/entities/form.entity';

describe('AUth and Form controller (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: 'db.sqlite',
          entities: [Form],
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
      "uniqueId": "21d44798-933b-43ea-8568-ca374e74ea55",
      "title": "user5",
      "name": "user name 5",
      "email": "test5@test.com",
      "phonenumber": "+919876543215",
      "isGraduate": true
     };
    const response = await request(app.getHttpServer())
      .post('/v1/form')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(formData)
      .expect(HttpStatus.CREATED);

    expect(response.body).toHaveProperty('id');
    expect(response.body.uniqueId).toEqual(formData.uniqueId);
    expect(response.body.title).toEqual(formData.title);
    expect(response.body.email).toEqual(formData.email);
    expect(response.body.phonenumber).toEqual(formData.phonenumber);
    expect(response.body.isGraduate).toEqual(formData.isGraduate);
  });

});
