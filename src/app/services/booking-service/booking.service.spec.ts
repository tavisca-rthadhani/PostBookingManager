import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BookingService } from './booking.service';

describe('BookingService', () => {
  let service: BookingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    service = TestBed.inject(BookingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get Booking', () => {

    // Arrange
    localStorage.clear();
    const actualInput = [{ bookingId: 'A0001' }];
    localStorage.setItem('local_bookings', JSON.stringify(actualInput));

    // Act
    const expectedOutput = service.getBooking('A0001');

    // Assert
    expect(actualInput[0].bookingId).toEqual(expectedOutput.bookingId);
  });

  it('Cancel Booking', () => {

    // Arrange
    localStorage.clear();
    const actualInput = [{ bookingId: 'A0001', bookingStatus: 'Booked' }];
    localStorage.setItem('local_bookings', JSON.stringify(actualInput));
    const responseObject = { status: '200', message: 'Booking Cancelled' };

    // Act
    let response = null;
    service.cancelBooking('A0001').subscribe((res) => {
      response = res;
    },
      (error: any) => { }
    );

    const requestWrapper = httpMock.expectOne((req) => req.url.indexOf(`booking/cancellation`) > -1);
    requestWrapper.flush(responseObject);

    // Assert
    expect(requestWrapper.request.method).toEqual('POST');
    expect(response).toEqual(responseObject);
  });

  it('Get Flight Details', () => {

    // Arrange
    const responseObject = { flightId: 'A0001', flightName: 'Go-Air' };

    // Act
    let response = null;
    service.getFlightDetails('A0001').subscribe((res) => {
      response = res;
    },
      (error: any) => { }
    );

    const requestWrapper = httpMock.expectOne((req) => req.url.indexOf(`booking/flight/A0001`) > -1);
    requestWrapper.flush(responseObject);

    // Assert
    expect(requestWrapper.request.method).toEqual('GET');
    expect(response).toEqual(responseObject);
  });

});
