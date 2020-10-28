export interface Booking {
  bookingId: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  price: number;
  bookingStatus: string;
  hotel: Hotel;
  customer: Customer[];
}

export interface Bookings {
  bookings: Booking[];
}

export interface Hotel {
  hotelName: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  phone: string;
}

export interface Customer {
  firstName: string;
  LastName: string;
  Gender: string;
  age: string;
}

export interface FlightDetail {
  flightId: string;
  flightName: string;
  from: string;
  to: string;
  departure: string;
  travelClass: string;
}
