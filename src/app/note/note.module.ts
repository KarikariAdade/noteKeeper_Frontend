import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteComponent } from './note.component';
import {SidebarComponent} from "../layouts/sidebar/sidebar.component";
import {NavComponent} from "../layouts/nav/nav.component";
import {CKEditorModule} from "ckeditor4-angular";
import { TagsComponent } from './tags/tags.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NoteComponent,
    SidebarComponent,
    NavComponent,
    TagsComponent,

  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    SidebarComponent
  ]
})
export class NoteModule { }
