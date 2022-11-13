import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteComponent } from './note.component';
import {AuthGuard} from "../Guards/auth.guard";
import {TagsComponent} from "./tags/tags.component";

const routes: Routes = [
  { path: '', component: NoteComponent, canActivate:[AuthGuard] },
  { path: 'tags', component: TagsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
