export function getDayOfWeek(date: Date) {
  return date.toLocaleDateString(undefined, {
    weekday: "long",
  });
}

export function isTimeInRange(
  requiredStartTime: Date,
  requiredEndTime: Date,
  currTime: Date
) {
  const rsH = requiredStartTime.getHours();
  const rsM = requiredStartTime.getMinutes();
  const rsS = requiredStartTime.getSeconds();

  const reH = requiredEndTime.getHours();
  const reM = requiredEndTime.getMinutes();
  const reS = requiredEndTime.getSeconds();

  const cH = currTime.getHours();
  const cM = currTime.getMinutes();
  const cS = currTime.getSeconds();

  const requiredStartTimeInSeconds = rsH * 3600 + rsM * 60 + rsS;
  const requiredEndTimeInSeconds = reH * 3600 + reM * 60 + reS;
  const currTimeInSeconds = cH * 3600 + cM * 60 + cS;

  return (
    currTimeInSeconds >= requiredStartTimeInSeconds &&
    currTimeInSeconds <= requiredEndTimeInSeconds
  );
}
