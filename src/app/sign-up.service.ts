import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

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

  signUp(signUp: any): Observable<SignUp> {
    return this.http.post<SignUp>('https://demo-api.now.sh/users', signUp, this.httpOptions)
      .pipe(
      // catchError(this.handleError('addHero', signUp))
    );
  }

}
