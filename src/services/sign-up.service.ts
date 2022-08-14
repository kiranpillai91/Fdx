import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SIGN_UP_URL } from '../constants/endpoints';

export interface SignUp { 
  firstName: string; 
  lastName: string;
  email: string;
  password: string; 
}

@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  signUp(signUpReq: any): Observable<SignUp> {
    return this.http.post<SignUp>(`${SIGN_UP_URL}`, signUpReq);
  }

}
