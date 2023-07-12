import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public register(registerRequest: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    
    return this.http.post(url, registerRequest);
  }

  public authenticate(authenticationRequest: any): Observable<any> {
    const url = `${this.baseUrl}/authenticate`;
    
    return this.http.post(url, authenticationRequest).pipe(
      tap((response: any) => {
        const token = response.access_token;
        this.tokenService.holdJWT(token);
      })
    );
  }

  public getTokenFromService(): any {
    return this.tokenService.getToken();
  }
}