import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FormErrorService extends Validators {

  static Name(control: FormControl){
    if(control.value && control.value.length > 0){
      const regex = /^([a-zA-Z]){2,20} $/;
      if(regex.test(control.value)){
        return null;
      }
      else{
        return{invalid: true};
      }
    }else{
      return null;
    }
  }
  static image(control: FormControl) {
    if (control.value && control.value.length > 0) {
      if (control.value.endsWith('.png') || control.value.endsWith('.jpg') || control.value.endsWith('.jpeg') ||control.value.endsWith('.PNG')) {
        console.log("if")
        return null;
      } else {
        console.log("else")
        return { invalidImage: true };
      }
    } else {
      return null;
    }
  }

}
