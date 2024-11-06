import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ISeparator} from './separator.model';

export function ValidateCustomMax(maxValue: number, separators: ISeparator): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(control.value !== undefined) {
      let currentValue = control.value;

      //Clear non-number separators
      if (separators !== undefined) {
        if (separators.thousand !== '') {
          currentValue = currentValue.replace(separators.thousand, '');
        }

        if (separators.decimal === ',') {
          currentValue = currentValue.replace(separators.decimal, '.');
        }
      }

      return (currentValue > maxValue) ? {max: {max: maxValue, actual: currentValue}} : null;
    }
  }
}
