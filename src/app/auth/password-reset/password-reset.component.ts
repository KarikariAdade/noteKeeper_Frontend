import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})

export class PasswordResetComponent implements OnInit {

  resetForm:FormGroup = new FormGroup({})

  formPassword: string = 'password'

  pwdIcon: string = 'bx bx-hide'

  encryptedMessage:any = '';

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.encryptedMessage = data['token'];
      console.log('ACTIVATED ROUTE: ', this.encryptedMessage)
    })

    this.resetForm = this.formBuilder.group({
      'code': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'password_confirmation': new FormControl('', [Validators.required, Validators.minLength(8)])
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

  resetFormSubmit(){
    console.log('form values: ', this.resetForm.value)

    this.authService.resetPassword(this.resetForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['auth'])
      },
      error: (errors) => {
        console.log('ERROR RESPONSE: ', errors.error)
      },

    })
  }
}
