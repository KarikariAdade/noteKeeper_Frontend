import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {AuthStateService} from "../../services/auth-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  loggedInUser:string = '';
  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private authState: AuthStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authState.userAuthState.subscribe((val) => {
      console.log('auth state', val)
    });

    if (this.loggedInUser === undefined || this.loggedInUser === null || Object.keys(this.loggedInUser).length === 0){
      this.authService.getUser().subscribe({
        next: (data) => {
          this.loggedInUser = data.msg.name;
        },
        error: (errors) => {
          console.log('errors', errors.status)
          if (errors.status == 401){
            this.authState.setAuthState(false)
            this.authService.removeToken()
            this.router.navigate(['auth']);
          }
        }
      })
    }

  }



  logOut(){
    this.authService.postLogout().subscribe({
      next: (data) => {
        this.authService.removeToken();
        this.authState.setAuthState(false);
      },
      error: (errors) => {
        this.toast.error(errors.error.msg)
      },
      complete: () => {
        this.router.navigate(['auth']);
      }
    })
  }

}
