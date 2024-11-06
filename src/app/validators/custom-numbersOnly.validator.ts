import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ISeparator} from './separator.model';

export function ValidateCustomNumbersOnlyPattern(allowDecimal?: boolean, separators?: ISeparator): ValidatorFn {
  let lastValue: string;
  let regexp: RegExp;

  return (control: AbstractControl): ValidationErrors | null => {

    if (control.value !== undefined) {
      if (control.value !== lastValue) {
        const currentValue = (typeof control.value === 'string') ? control.value : control.value.toString();

        let result: string = '';

        if (allowDecimal && separators) {
          if (separators.decimal === ',' && separators.thousand === '.') {
            regexp = /[^\d\-,.]/g;
          } else if (separators.decimal === ',' && separators.thousand === '') {
            regexp = /[^\d\-,]/g;
          } else if (separators.decimal === '.' && separators.thousand === ',') {
            regexp = /[^\d\-,.]/g;
          } else if (separators.decimal === '.' && separators.thousand === '') {
            regexp = /[^\d\-.]/g;
          }
        } else {
          regexp = /\D/g;
        }

        result = currentValue.replace(regexp, '');
        lastValue = result;
        control.setValue(lastValue);
      }
    }

    return null;
  }
}
