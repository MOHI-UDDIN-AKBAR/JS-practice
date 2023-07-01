const elementToPlaceTime = Array.from(
  document.querySelectorAll(".countDown div span")
);

const formateTime = (time) => {
  return time < 10 ? `0${time}` : time.toString();
};

const updateCountDown = () => {
  const currentDate = new Date();
  const targetDate = new Date("2024-05-03T11:30:00");
  const timeDifferenceMs = targetDate.getTime() - currentDate.getTime();
  let daysLeft = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
  let hoursLeft = Math.floor(
    (timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutesLeft = Math.floor(
    (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
  );
  let secondsLeft = Math.floor((timeDifferenceMs % (1000 * 60)) / 1000);

  daysLeft = formateTime(daysLeft);
  hoursLeft = formateTime(hoursLeft);
  minutesLeft = formateTime(minutesLeft);
  secondsLeft = formateTime(secondsLeft);

  const timeValues = {
    days: daysLeft,
    hours: hoursLeft,
    minutes: minutesLeft,
    secs: secondsLeft,
  };

  elementToPlaceTime.forEach((eachElement) => {
    //version one
    eachElement.innerText =
      timeValues.hasOwnProperty(eachElement.classList[0]) &&
      timeValues[eachElement.classList[0]];
    //version two
    // if (eachElement.classList.contains("days")) {
    //   eachElement.innerText = daysLeft;
    // } else if (eachElement.classList.contains("hours")) {
    //   eachElement.innerText = hoursLeft;
    // } else if (eachElement.classList.contains("minutes")) {
    //   eachElement.innerText = minutesLeft;
    // } else if (eachElement.classList.contains("secs")) {
    //   eachElement.innerText = secondsLeft;
    // }
  });
};
setInterval(() => updateCountDown(), 1000);
