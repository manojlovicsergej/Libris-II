import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    ToastModule,
    CommonModule
  ],
  standalone: true,
  providers : [MessageService,HttpClientModule]
})
export class AppComponent {
  title = 'client';
}
