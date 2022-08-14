import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CustomValidatorService } from '../../validators/custom-validator-service';
import { SignUpService } from '../../services/sign-up.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  loader = false;

  constructor(private signUpService: SignUpService, private customValidatorService: CustomValidatorService) { }

  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, this.customValidatorService.passwordPatternValidator()])
  },
    {
      validators: [this.customValidatorService.passwordContains()]
    });

  ngOnInit(): void {
  }

  onSubmit() {
    this.loader = true;
    this.signUpService.signUp(this.signUpForm.value)
      .subscribe(() => {
        this.loader = false;
      });
  }


}
