import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthStateService} from "../services/auth-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  regSuccess:string = ''

  loginForm: FormGroup = new FormGroup<any>({})

  formPassword: string = 'password'

  pwdIcon: string = 'bx bx-hide'

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private authState: AuthStateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.regSuccess = this.authService.sharedData;

    if(this.regSuccess !== ''){

      this.toast.success(this.regSuccess, 'Welcome',);
    }

    this.loginForm = this.fb.group({

      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])

    })

  }


  submitLogin() {
    this.authService.postLogin(this.loginForm.value).subscribe({
      next: (data) => {
        console.log('data', data)
        this.authState.setAuthState(true)
        this.authService.saveToken(data.msg.token)
        this.router.navigate(['dashboard']);
      },
      error: (errors) => {
        console.log('ERRORS', errors.error)
        this.toast.error(errors.error.msg, 'Error')
      }
    })
  }


  changePwdView() {
    if (this.formPassword === 'password'){
      this.formPassword = 'text';
      this.pwdIcon = 'bx bx-show'
    }else{
      this.formPassword = 'password';
      this.pwdIcon = 'bx bx-hide'
    }
  }





}
