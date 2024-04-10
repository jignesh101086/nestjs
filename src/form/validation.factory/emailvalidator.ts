import {  IsEmail, MaxLength } from "class-validator";

export class EmailValidator {
   
    @IsEmail()
    @MaxLength(255)
    field: string;

}