export const getCorrectRating = (rating: any) =>
  Math.floor(rating >= 2 ? rating / 2 : rating);

export const getFractionDigitsRating = (rating: any) => rating.toFixed(1);

export const getRatingLabel = (rating: any) => {
  const reviews = ['แย่', 'พอใช้', 'ดี', 'ดีมาก', 'ยอดเยี่ยม'];
  return reviews[rating - 1];
};