import {addLeadingZero} from "../modules/helpers";

export const getTimeStamp = () => {
  const date = new Date();

  const parts = {
    hours: addLeadingZero(date.getHours()),
    minutes: addLeadingZero(date.getMinutes()),
    seconds: addLeadingZero(date.getSeconds()),
  };

  return `[${parts.hours}:${parts.minutes}:${parts.seconds}]`;
};

export default class Logger {
  log(...args) {
    console.log(...args);
  }
}