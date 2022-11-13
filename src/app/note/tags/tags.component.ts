import { Component, OnInit } from '@angular/core';
import {NoteService} from "../note.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalServiceService} from "../../services/global-service.service";
import {Tag} from "../../interfaces/tag";
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(
    private noteService: NoteService,
    private fb: FormBuilder,
    private globalService: GlobalServiceService,
  ) { }

  tagForm : FormGroup = new FormGroup<any>({})

  tags:any = []

  ngOnInit(): void {

    this.loadTags();

    this.tagForm = this.fb.group({
      'name': new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  loadTags() {
    this.noteService.fetchTags().subscribe({
      next: ((response) => {
        this.tags = response.msg
      })
    })
  }

  submitTag(){
    this.noteService.postTag(this.tagForm.value).subscribe({
      next: ((data) => {
        this.globalService.generateResponse('success', data.msg)
      }),
      error: ((errors) => {
        this.globalService.generateResponse('error', errors.error.msg);
      }),
      complete: (() => {
        this.loadTags();
      })
    })
  }

  removeTag(tag:Tag){
    console.log(tag)
    this.noteService.deleteTag(tag).subscribe({
      next: ((response) => {
        this.globalService.generateResponse('success', response.msg)
      }),
      error: ((errors) => {
        this.globalService.generateResponse('error', errors.error.msg);
      }),
      complete: (() => {
        this.loadTags();
      })
    })
  }

}
