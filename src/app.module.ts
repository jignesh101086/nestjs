import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form/entities/form.entity';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { FormFields } from './form/entities/formfield.entity';
import { FormValues } from './form/entities/formvalue.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Form, FormFields, FormValues],
      synchronize: true,    /**Only for dev not for Prod */
    }),
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 4,
    }]),
    AuthModule, 
    FormModule, UsersModule
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ]
})
export class AppModule {}
