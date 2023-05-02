type BookingTripsList = {
  title: any;
  price: any
}
type BookingInformationList = {
  title: any;
  price: any;
  adults: any;
  children: any;
  bookingDate: any;
}


export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Login: undefined;
  EmailLogin: undefined;
  Register: undefined;
  SendOTP: undefined;
  InputOTP: { phoneNumber: string, verificationId: string };
  TripDetails: { trip: any };
  AllTrips: { type: string };
  HotelScreen: { hotel: any };
  ReviewAll: { reviews: Array<any>[] };
  Search: undefined;
  BookingTrips: BookingTripsList;
  BookingInformation: BookingInformationList;
  Transaction: undefined;

};

