export const convertToTwoDigits = (number: number): string => {
  if (number <= 9) return "0" + number;
  else return number.toString();
};

export const formatDate = (date: Date) => {
  const day = date.getDate();
  const dayString = day < 10 ? "0" + day : day;

  const month = date.getMonth() + 1;
  const monthString = month < 10 ? "0" + month : month;

  const year = date.getFullYear();
  return year + "-" + month + "-" + day;
};
