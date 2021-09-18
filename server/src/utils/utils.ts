export const convertToTwoDigits = (number: number): string => {
  if (number <= 9) return "0" + number;
  else return number.toString();
};
