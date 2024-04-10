import { IsUUID, MaxLength } from "class-validator";

export class UniqueIdValidate {
    @IsUUID()
    @MaxLength(36)
    field: string;
}