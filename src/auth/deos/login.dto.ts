import { IsString, MaxLength } from "class-validator";

export class LoginDto {
    @IsString()
    @MaxLength(255)
    username: string;

    @IsString()
    @MaxLength(255)
    password: string;
}