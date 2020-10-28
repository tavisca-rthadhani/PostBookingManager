import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Booking } from 'src/app/services/booking';
import { BookingService } from 'src/app/services/booking-service/booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['bookingId', 'hotelName', 'roomName', 'checkIn', 'checkOut', 'price', 'bookingStatus'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookingService: BookingService, private router: Router) {


  }

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe((bookings) => {
      this.dataSource = new MatTableDataSource(bookings);
    });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectBooking(selectedBooking) {
    this.router.navigateByUrl(`/booking/${ selectedBooking.bookingId}`);
  }

}

