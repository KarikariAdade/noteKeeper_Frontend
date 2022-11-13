import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../interfaces/tag";
import {Observable} from "rxjs";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  fetchTags(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}tags`)
  }

  postTag(tag: FormGroup): Observable<any>{
    return this.http.post(`${this.apiUrl}tags/store`, tag)
  }

  updateTag(tag: Tag): Observable<any>{
    return this.http.post(`${this.apiUrl}tags/update`, tag)
  }

  deleteTag(tag: Tag): Observable<any>{
    return this.http.post(`${this.apiUrl}tags/delete`, {'tag': tag});
  }

}
