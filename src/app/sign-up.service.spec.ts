import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';

import { SignUpService } from './sign-up.service';

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
      service.signUp({}).subscribe(
        () => {
        }
      );
    });

  });
});
