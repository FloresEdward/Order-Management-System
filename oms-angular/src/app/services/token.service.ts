import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEY_KEY = "e47b151def79c1f8c7cb23d7deb3709f2f8f4fa6d24c7facd5d79d103bfec7e9";
  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEY_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEY_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEY_KEY);
  }
}
