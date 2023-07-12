import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEY_KEY = "e47b151def79c1f8c7cb23d7deb3709f2f8f4fa6d24c7facd5d79d103bfec7e9";
  constructor() { }

  holdJWT(token: string): void {
    this.saveToken(token);
    const decodedToken: any = jwt_decode(token);
    const sub: string = decodedToken.sub;
    const role: string = decodedToken.role;
    this.saveEmailFromToken(sub);
    this.saveRoleFromToken(role);
  }
  

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEY_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEY_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEY_KEY);
    localStorage.removeItem('CURRENT_USER');
    localStorage.removeItem('sub');
    localStorage.removeItem('role');
  }

  saveEmailFromToken(sub: string): void {
    localStorage.setItem('sub', sub);
  }

  getEmailFromToken(): string | null{
    return localStorage.getItem('sub');
  }

  saveRoleFromToken(role: string): void {
    localStorage.setItem('role', role);
  }

  getRoleFromToken(): string | null {
    return localStorage.getItem('role');
  }
}
