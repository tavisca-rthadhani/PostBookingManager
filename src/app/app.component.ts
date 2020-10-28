import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Post Booking Manager';
  currentApplicationVersion = environment.appVersion;
  constructor(
    public authService: AuthService
  ) {

  }
}
