import {
  AbstractControl,  
  ValidatorFn
} from '@angular/forms';

/**
 * Custom validator to check the length of the input value and,
 * if it has a max assigned, after proceeding with the deletion of the last character,
 * Angular 'max validator' is executed.
 *
 * @param maxLength
 * @constructor
 */
export function ValidateCustomMaxLength(maxLength: number): ValidatorFn {
  return (control: AbstractControl): null => {
    if (control.value !== undefined) {
      const currentValue = (typeof control.value === 'string') ? control.value : control.value.toString();

      if (currentValue.length > maxLength) {
        let result = currentValue.substring(0, currentValue.length - 1)
        control.setValue(result,{eventEmitter: false})
      }  
    } 
    
    return null;
  }
}
