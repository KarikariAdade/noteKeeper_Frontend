import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AuthGuard} from "./Guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  {path: '**', component: PageNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
