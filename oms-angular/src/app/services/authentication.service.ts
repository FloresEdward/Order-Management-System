import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  public register(registerRequest: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, registerRequest);
  }

  public authenticate(authenticationRequest: any): Observable<any> {
    const url = `${this.baseUrl}/authenticate`;
    return this.http.post(url, authenticationRequest);
  }
}