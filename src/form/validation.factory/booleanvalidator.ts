import { IsBoolean } from "class-validator";

export class BooleanValidator {

    @IsBoolean()
    field: boolean;
}