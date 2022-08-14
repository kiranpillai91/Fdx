import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SignUpService } from '../../services/sign-up.service';

import { SignUpFormComponent } from './sign-up-form.component';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let signUpServiceSpy = jasmine.createSpyObj('SignUpService', ['signUp']);
  signUpServiceSpy.signUp.and.returnValue(of());


  const setFormValue = (firstName = "", lastName = "", email = "", password = "") => {
    component.signUpForm.setValue({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpFormComponent],
      providers: [
        {
          provide: SignUpService, useValue: signUpServiceSpy
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Sign up form validations', () => {
    it('All fields required', () => {
      setFormValue();
      expect(component.signUpForm.valid).toEqual(false);
    });
    it('should be valid if form value is valid', () => {
      setFormValue("Bob", "T", "test@fdx.com", "abcdeF12");
      expect(component.signUpForm.valid).toEqual(true);
    });
  });

  describe('Sign up form submit', () => {
    it('should be valid if form value is valid', () => {
      setFormValue("Bob", "T", "test@fdx.com", "abcdeF12");
      expect(component.signUpForm.valid).toEqual(true);
      component.onSubmit();
      expect(signUpServiceSpy.signUp).toHaveBeenCalledWith({
        firstName: "Bob",
        lastName: "T",
        email: "test@fdx.com",
        password: "abcdeF12"
      });
    });
  });
});
