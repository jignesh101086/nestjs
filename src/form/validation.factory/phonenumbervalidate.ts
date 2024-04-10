import { IsPhoneNumber, MaxLength } from "class-validator";

export class PhonenumberValidate {

    @IsPhoneNumber()
    @MaxLength(15)
    field: string;

}