import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

export function conditionallyRequiredValidator(masterControlLabel: string, operator: string, conditionalValue: any, slaveControlLabel: string) {
  return (group: FormGroup): {[key: string]: any} => {
    const masterControl = group.controls[masterControlLabel];
    const slaveControl = group.controls[slaveControlLabel];     
    if (eval(`'${masterControl.value}' ${operator} '${conditionalValue}'`)) { 
      return Validators.required(slaveControl)
    }
    slaveControl.setErrors(null); 
    return null;
  }
}

