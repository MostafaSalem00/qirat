import { AbstractControl, ValidatorFn } from "@angular/forms";

export function myconditionalValidator(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (! condition()) {
        return null;
      }
      return validator(control);
    }
}