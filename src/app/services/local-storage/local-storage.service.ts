import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private http: HttpClient) { }

  STORAGE_KEY = 'local_bookings';

  public updateBooking(data: any) {
    const storedBookingList = this.getItem(this.STORAGE_KEY) || [];
    const currentBookings = storedBookingList.filter((booking) => booking.bookingId !== data.bookingId);

    currentBookings.push(data);
    this.setItem(currentBookings);
  }

  public getBooking(bookingId: string) {
    const currentBookingList = this.getItem(this.STORAGE_KEY) || [];
    return currentBookingList.find((booking) => booking.bookingId === bookingId);
  }

  public getBookings() {
    const currentBookingList = this.getItem(this.STORAGE_KEY) || [];
    return currentBookingList;
  }

  public storeAllBooking() {
    return this.http.get(`/assets/bookings.json`).pipe(
      tap(bookings => {
        this.setItem(bookings);
      })
    ).toPromise();
  }

  private setItem(item: any) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(item));
  }

  private getItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
}
