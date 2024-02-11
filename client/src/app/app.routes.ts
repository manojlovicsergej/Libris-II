import { Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {authRoutes} from "./auth/auth.routes";

export const routes: Routes = [
  { 'path' : 'auth', component : AuthComponent, children : [...authRoutes] },
  { 'path' : '**', redirectTo : '/auth' }
];
