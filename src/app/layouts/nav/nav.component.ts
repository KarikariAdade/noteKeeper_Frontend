import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  current_route: string = ''

  ngOnInit(): void {
    this.current_route = this.router.url;

  }

  toggleActive(path:any){
    if (this.current_route === path){
      return 'menu-item active'
    }else{
      return 'menu-item'
    }
  }
}
