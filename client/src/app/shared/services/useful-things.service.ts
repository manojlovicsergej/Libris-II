import { Injectable } from '@angular/core';
import {AbstractControl, FormControl} from "@angular/forms";

/** Variables */
export const BASE_URL = "https://localhost:5035/";

@Injectable({
  providedIn: 'root'
})
export class UsefulThingsService {

  constructor() { }


}
/** Functions */
export function asFormControl(control: AbstractControl): FormControl {
  if (control instanceof FormControl) {
    return control;
  } else {
    return new FormControl(control.value, control.validator);
  }
}
