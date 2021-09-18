export const convertToTwoDigits = (number: string): string => {
  if (parseInt(number) <= 9) return "0" + number;
  else return number;
};
