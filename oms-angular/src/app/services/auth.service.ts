import { Injectable } from '@angular/core';
import { AuthStateService } from '../shared/auth-state.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private stateService: AuthStateService,
    private router: Router,
    private httpClient: HttpClient) { }

    isAuthenticated() {
    return this.stateService.hasCurrentUser();
  }

  login(username: string, password: string) {
    this.stateService.removeCurrentUser();

    let user: User = new User();
    user.username = username;
    user.firstName = 'John';
    user.lastName = 'Doe';

    this.stateService.setCurrentUser(user);
  }

  logout() {
    this.stateService.removeCurrentUser();
  }
}
