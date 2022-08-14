import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  passwordPatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  passwordContains(): ValidatorFn {
    return (formGroup: AbstractControl) : { [key: string]: boolean } | null => {
      const passwordControl = formGroup.get('password')?.value.toLowerCase();
      if(!passwordControl) {
        return null;
      }
      const firstNameControl = formGroup.get('firstName')?.value.toLowerCase();
      const lastNameControl = formGroup.get('lastName')?.value.toLowerCase();
      if (firstNameControl && passwordControl.indexOf(firstNameControl) !== -1) {
        return { passwordContains: true };
      } else if (lastNameControl && passwordControl.indexOf(lastNameControl) !== -1) {
        return { passwordContains: true };
      }
      return null;
    };
  }

}
