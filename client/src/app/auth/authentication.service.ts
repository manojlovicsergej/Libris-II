import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JwtAuth, LoginRequest, RegisterRequest} from "./auth-models";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "Authorization/register";
  loginUrl = "Authorization/login";

  constructor(private _http : HttpClient) { }

  public register(user : RegisterRequest) : Observable<JwtAuth>{
    return this._http.post<JwtAuth>(`${environment.apiUrl}/${this.registerUrl}`,user);
  }

  public login(user : LoginRequest) : Observable<JwtAuth>{
    return this._http.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}`,user);
  }
}
