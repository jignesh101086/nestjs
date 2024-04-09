import { IsBoolean, IsEmail, IsNumber, IsPhoneNumber, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateFormDto {

    @IsUUID()
    @MaxLength(36)
    uniqueId: string;
    
    @IsString()
    @MaxLength(255)
    title: string;

    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsPhoneNumber()
    @MaxLength(15)
    phonenumber: string;

    @IsBoolean()
    isGraduate: boolean;
}