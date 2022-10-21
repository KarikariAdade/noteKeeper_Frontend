import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import {RegisterComponent} from "./register/register.component";
import {PasswordRequestComponent} from "./password-request/password-request.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {GuestGuard} from "../Guards/guest.guard";

const routes: Routes = [
  {path: '', component: AuthComponent, canActivate: [GuestGuard]},
  { path: 'login', component: AuthComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  { path: 'request/password', component: PasswordRequestComponent, canActivate: [GuestGuard]},
  { path: 'reset/password', component: PasswordResetComponent, canActivate: [GuestGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
