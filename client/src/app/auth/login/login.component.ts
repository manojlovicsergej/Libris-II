import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CheckboxModule} from "primeng/checkbox";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FieldComponent} from "../../shared/components/ui/field/field.component";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ControlsOf} from "../../shared/utils/form-configs";
import {LoginRequest} from "../auth-models";
import {AuthenticationService} from "../authentication.service";
import {FormControlPipe} from "../../shared/pipes/form-control.pipe";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CheckboxModule,
    FormsModule,
    FieldComponent,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormControlPipe,
    HttpClientModule
  ],
  providers : [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnDestroy{
  private _subs : Subscription = new Subscription();

  value : string  = '';

  form! : FormGroup<ControlsOf<LoginRequest>>;

  constructor(private _fb : FormBuilder, private _authService : AuthenticationService) {
  }

  ngOnInit(): void {
    this.form = this._fb.group<ControlsOf<LoginRequest>>({
      username: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  submitForm(){
    this._subs.add(
      this._authService.login(this.form.value).subscribe((res)=>{
        localStorage.setItem('jwtToken', res.token);
      })
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
