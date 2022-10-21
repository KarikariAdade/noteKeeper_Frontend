import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private userState = new BehaviorSubject<boolean>(this.authService.isLoggedIn()!);

  userAuthState = this.userState.asObservable();

  constructor(private authService: AuthService) { }

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}
