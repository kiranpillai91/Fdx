import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';

import { SignUp, SignUpService } from './sign-up.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SIGN_UP_URL } from '../constants/endpoints';

describe('SignUpService', () => {
  let service: SignUpService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpService],
    });
    service = TestBed.inject(SignUpService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('', () => {
    it('Sign Up', () => {
      let actualSignUp: SignUp | undefined;
      const signUpResponse = { firstName: "Bob", lastName: "T", email: "test@fdx.com", password: "abcdeF12" };
      service.signUp({ firstName: "Bob", lastName: "T", email: "test@fdx.com", password: "abcdeF12" }).subscribe(
        (response) => {
          actualSignUp = response;
        }
      );
      const request = controller.expectOne(SIGN_UP_URL);
      request.flush(signUpResponse);
      controller.verify();
      expect(actualSignUp).toEqual(signUpResponse);
    });

    it('passes through  errors', () => {
      const status = 500;
      const statusText = 'Internal Server Error';
      const errorEvent = new ErrorEvent('API error');
      let actualError: HttpErrorResponse | undefined;
      service.signUp({ firstName: "Bob", lastName: "T", email: "test@fdx.com", password: "abcdeF12" }).subscribe(
        () => {},
        (error) => {
          actualError = error;
        }
      );
      controller.expectOne(SIGN_UP_URL).error(errorEvent, { status, statusText });
      if (!actualError) {
        throw new Error('Error needs to be defined');
      }
      expect(actualError.error).toBe(errorEvent);
      expect(actualError.status).toBe(status);
      expect(actualError.statusText).toBe(statusText);
    });
  });
});
