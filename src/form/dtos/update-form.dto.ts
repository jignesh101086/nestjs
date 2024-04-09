import { IsBoolean, IsEmail, IsPhoneNumber, IsString, IsUUID, MaxLength } from "class-validator";

export class UpdateFormDto {

    @IsUUID()
    @MaxLength(36)
    uniqueId: string;
   
    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsPhoneNumber()
    @MaxLength(15)
    phonenumber: string;

    @IsBoolean()
    isGraduate: boolean;
}