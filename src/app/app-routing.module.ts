import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
  { path: 'booking/:id', component: BookingDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
