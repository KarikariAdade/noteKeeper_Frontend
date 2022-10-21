import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {GlobalServiceService} from "../../services/global-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup = new FormGroup({})

  formPassword: string = 'password'

  pwdIcon: string = 'bx bx-hide'

  constructor(
    private globalService: GlobalServiceService,
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
      'password_confirmation': new FormControl('', [Validators.required])
    })

  }

  submitRegistration(){
    this.authService.postRegister(this.registerForm.value).subscribe({
      next: (data) => {
        this.authService.sharedData = 'Thank you for joining NoteKeeper. Kindly login with your email and password';
        this.router.navigate(['auth']);
      },
      error: (errors) => {

        this.toast.error(errors.error.msg, 'Error!')
      },
      complete: () => {
        alert('complete')
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
