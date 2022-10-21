import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.css']
})
export class PasswordRequestComponent implements OnInit {

  passwordRequestForm: FormGroup = new FormGroup<any>({});

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.passwordRequestForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email])
    })
  }

  requestPasswordReset(){
    console.log('form fields', this.passwordRequestForm.value)
    this.authService.requestPassword(this.passwordRequestForm.value).subscribe({
      next: (data) => {
        this.toaster.success(data.msg)
        this.router.navigate(['auth/reset/password']);
      },
      error: (errors) => {
        this.toaster.error(errors.error.msg)
        console.log('errors: ', errors)
      }
    })
  }

}
