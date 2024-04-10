import { IsString, MaxLength } from "class-validator";

export class StringValidate {

    @IsString()
    @MaxLength(255)
    field: string;
}