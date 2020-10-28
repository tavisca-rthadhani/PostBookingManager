import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/bookings']);
    }
  }

  SignIn(userName, userPassword) {
    this.authService.SignIn(userName, userPassword).then(() => {
      setTimeout(() => { this.router.navigate(['/bookings']); }, 100);
    });
  }

}
