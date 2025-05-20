export const isNight = (): boolean => {
  const hours = new Date().getHours();
  return hours >= 22 || hours < 6;
};

export const trimText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};
