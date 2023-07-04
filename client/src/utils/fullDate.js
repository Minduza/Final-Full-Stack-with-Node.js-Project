export const currentTime = () => {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;
  const fullDate = `${currentDate.toLocaleDateString("lt-LT")} ${currentTime}`;

  return fullDate;
};
