import { dayOfYear, weekNumber } from 'weeknumber';

const MINUTE = 60000;
const WEEK = 604800000;

const weekday = date => (date.getDay() + 6) % 7 + 1;

const weekEpoch = new Date(1970, 0, -2); // monday before unix epoch in local timezone
const weekOfEpoch = date =>
  Math.floor((date - weekEpoch + (weekEpoch.getTimezoneOffset() - date.getTimezoneOffset()) * MINUTE) / WEEK);

function modify (date, unit, value) {
  switch (unit) {
    case 'Y':
      date.setFullYear(date.getFullYear() + value);
      break;
    case 'M':
      date.setMonth(date.getMonth() + value);
      break;
    case 'W':
      date.setDate(date.getDate() + value * 7);
      break;
    case 'D':
      date.setDate(date.getDate() + value);
      break;
    case 'h':
      date.setHours(date.getHours() + value);
      break;
    case 'm':
      date.setMinutes(date.getMinutes() + value);
      break;
    case 's':
      date.setSeconds(date.getSeconds() + value);
      break;
  }

  return date;
};

/**
 * Convert date-like objects to regular Date (adds support for moment)
 * @param Object|Date date
 * @return Date
 */
export const convert = date => typeof date.toDate === 'function' ? date.toDate() : date;

export const clone = date => new Date(+date);

export const get = {
  Y: {
    E: date => date.getFullYear()
  },
  M: {
    Y: date => date.getMonth() + 1
  },
  W: {
    E: weekOfEpoch,
    Y: weekNumber
  },
  D: {
    Y: dayOfYear,
    M: date => date.getDate(),
    W: date => weekday(date)
  },
  h: {
    D: date => date.getHours()
  },
  m: {
    h: date => date.getMinutes()
  },
  s: {
    m: date => date.getSeconds()
  }
};

export function getValue (unit, scope, date) {
  if (!get[unit]) {
    throw Error('Unit not implemented: ' + unit);
  }

  if (!get[unit][scope]) {
    throw Error('Scope not implemented: ' + unit + ' of ' + scope);
  }

  return get[unit][scope](date);
};

export const add = (date, unit, value) => modify(date, unit, value);
export const sub = (date, unit, value) => modify(date, unit, -value);
