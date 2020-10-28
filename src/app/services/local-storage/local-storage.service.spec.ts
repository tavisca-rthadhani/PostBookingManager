import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
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
    service = TestBed.inject(LocalStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Update Booking', () => {

    // Arrange
    localStorage.clear();
    const mockData = [{ bookingId: 'A0001' }];
    localStorage.setItem('local_bookings', JSON.stringify(mockData));

    // Act
    const actualInput = { bookingId: 'A0001' };
    service.updateBooking(actualInput);

    // Assert
    const expectedOutput = service.getBookings();
    expect(actualInput.bookingId).toEqual(expectedOutput[0].bookingId);
  });

  it('Get Booking', () => {

    // Arrange
    localStorage.clear();
    const mockData = [{ bookingId: 'A0001' }];
    localStorage.setItem('local_bookings', JSON.stringify(mockData));

    // Act
    const actualInput = 'A0001';
    const expectedOutput = service.getBooking(actualInput);

    // Assert
    expect(actualInput).toEqual(expectedOutput.bookingId);
  });

  it('Store All Bookings', () => {

    // Arrange
    localStorage.clear();
    const mockData = [{ bookingId: 'A0001' }];

    // Act
    service.storeAllBooking();

    const request = httpMock.expectOne((req) => req.url.indexOf(`/assets/bookings.json`) > -1);
    request.flush(mockData);

    // Assert
    const expectedOutput = service.getBookings();
    expect(mockData[0].bookingId).toEqual(expectedOutput[0].bookingId);

  });



});
