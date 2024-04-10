import { IsBoolean, IsEmail, IsNumber, IsPhoneNumber, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateFormDto {

    @IsString()
    @MaxLength(255)
    title: string;

}