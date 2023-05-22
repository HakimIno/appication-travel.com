import moment from "moment";

export const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


export const generateRandomID = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomID = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomID += characters[randomIndex];
  }

  return randomID;
};

export const calculateDuration = (checkInDate: any, checkOutDate: any) => {
  const checkIn = moment(checkInDate, 'DD MMM');
  const checkOut = moment(checkOutDate, 'DD MMM');
  const durationInDays = checkOut.diff(checkIn, 'days');
  const durationInNights = durationInDays > 1 ? durationInDays - 1 : 0; // Subtract 1 only if duration is more than 1 day
  return { durationInDays, durationInNights };
}; 