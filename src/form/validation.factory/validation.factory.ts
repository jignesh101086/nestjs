import { EmailValidator } from "./emailvalidator";
import { BooleanValidator } from "./booleanvalidator";
import { PhonenumberValidate } from "./phonenumbervalidate";
import { StringValidate } from "./stringvalidate";
import { UniqueIdValidate } from "./uniqueIdvalidate";

export class ValidationFactory {
    static createValidateObj(type: string) {
        switch (type) {
            case 'uuid':
                return new UniqueIdValidate();
            case 'string':
                return new StringValidate();
            case 'email':
                return new EmailValidator();
            case 'number':
                return new PhonenumberValidate();
            case 'boolean':
                return new BooleanValidator();
            default:
                throw new Error('Invalid field type');
        }
    }
}