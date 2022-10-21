import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { PasswordRequestComponent } from './password-request/password-request.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    PasswordRequestComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class AuthModule { }
