import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor(
    private toast: ToastrService,
    ) {}


  generateResponse(type:string, message: string){
    if (type === 'success'){
      return this.toast.success(message, 'success')
    }else if (type === 'error'){
      return this.toast.error(message, 'error')
    }else{
      return this.toast.show(message, 'info')
    }
  }

}
