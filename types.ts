type BookingTripsList = {
  title: any;
  tripsId?: any;
  hotelsId?: any;
  image: any;
  price: any
  childrenPrice?: any;
  types?: any;

}
type BookingHotelsList = {
  title: any;
  hotelsId?: any;
  option_room: any;
  image: any;
  price: any
  types?: any;
}
type BookingInformationList = {
  title?: any;
  tripsId?: any;
  hotelsId?: any;
  price?: any;
  image?: any;
  adults?: any;
  children?: any;
  bookingDate?: any;
  checkInDate?: any;
  checkOutDate?: any;
  selectRoom?: any;
  types?: any;
}

type RootParams = {
  displayName: string;
  email: string;
};

export type RootStackParamList = {
  Root: RootParams;
  Home: undefined;
  Notification: undefined;
  Login: undefined;
  EmailLogin: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  SendOTP: undefined;
  InputOTP: { phoneNumber: string, verificationId: string };
  TripDetails: { trip: any };
  AllTrips: { type: string };
  HotelScreen: { hotel: any };
  ReviewAll: { reviews: Array<any>[] };
  Search: undefined;
  Favorite: undefined;
  BookingTrips: BookingTripsList;
  BookingHotels: BookingHotelsList;
  BookingInformation: BookingInformationList;
  ReviewInput: { title: any, tripsId?: any, hotelsId?: any, orderId: any };
  Settings: RootParams;
  FullScreenImage: { imageUrl: any }
  StatusBooking: undefined;
  About: undefined;
  NotificationDetails: { notification: any};
  PromoDetails: { promotion: any}
};


