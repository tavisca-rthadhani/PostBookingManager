import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private storageService: LocalStorageService,
    private http: HttpClient
    ) { }


  public getBookings() {
    const storedBookings = this.storageService.getBookings();
    return of(storedBookings).pipe(
      map((bookings) => bookings)
    );
  }


  public getBooking(bookingId: string) {
    const storedBookings = this.storageService.getBookings();
    return storedBookings.find((booking) => booking.bookingId === bookingId);
  }

  public cancelBooking(bookingId: string) {
    const storedBookings = this.storageService.getBookings();
    const booking = storedBookings.find((item) => item.bookingId === bookingId);
    booking.bookingStatus = 'Cancelled';
    this.storageService.updateBooking(booking);

    // Called Mock API to cancel booking
    return this.http.post(`${environment.apiURL}booking/cancellation`, {bookingId});

  }

  public getFlightDetails(bookingId: string) {
    return this.http.get(`${environment.apiURL}booking/flight/A0001`);
  }

}
