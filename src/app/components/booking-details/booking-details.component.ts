import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../share/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  bookingForm: FormGroup;
  bookingDetails: any = {};
  result = '';
  flightDetails: any = {};

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const bookingID = params.get('id');
      this.bookingDetails = this.bookingService.getBooking(bookingID);
      this.setBookingData();
    });

  }

  public submitBooking() {
    console.log(this.bookingForm.value);
  }

  private initForm() {
    this.bookingForm = this.formBuilder.group({
      bookingId: [''],
      hotelName: [''],
      roomName: [''],
      checkIn: [''],
      checkOut: [''],
      price: [''],
      bookingStatus: ['']
    });
  }

  private setBookingData() {
    this.bookingForm.setValue({
      bookingId: this.bookingDetails.bookingId,
      hotelName: this.bookingDetails.hotelName,
      roomName: this.bookingDetails.roomName,
      checkIn: this.bookingDetails.checkIn,
      checkOut: this.bookingDetails.checkOut,
      price: this.bookingDetails.price,
      bookingStatus: this.bookingDetails.bookingStatus,
    });
  }

  public confirmDialog(): void {
    const message = `Are you sure you want cancel  ${this.bookingDetails.bookingId} booking?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      this.bookingService.cancelBooking(this.bookingDetails.bookingId).subscribe((res) => {
        this.snackBar.open(`Successfully cancelled booking ${this.bookingDetails.bookingId}`, 'Ok', {
          duration: 2000,
        });
      });
    });
  }

  public getFlightDetails() {
    this.bookingService.getFlightDetails(this.bookingDetails.bookingId).subscribe((flight) => {
      this.flightDetails = flight;
      this.snackBar.open('Received Flight Detail', 'Ok', {
        duration: 2000,
      });
    });
  }

}
