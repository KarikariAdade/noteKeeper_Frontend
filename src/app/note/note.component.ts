import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor() { }

  show:string = 'hide';

  ngOnInit(): void {
  }

  showNoteForm(){
    if (this.show === 'hide'){
      this.show = 'show'
    }else{
      this.show = 'hide'
    }
  }

}
