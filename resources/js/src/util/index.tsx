import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';

import { DATE_FORMAT_TYPE, LOCALE, TIME_ZONE } from '../constants';
import { getScreenDevice } from '../hooks';

const ranksDESC = ['lg', 'md', 'sm', 'xl', 'sx', 'xxl'];
const ranksASC = ['xxl', 'sx', 'xl', 'sm', 'md', 'lg'];

export const getValue = (props: {
  lg?: React.CSSProperties | undefined;
  md?: React.CSSProperties | undefined;
  sm?: React.CSSProperties | undefined;
  xl?: React.CSSProperties | undefined;
  xs?: React.CSSProperties | undefined;
  xxl?: React.CSSProperties | undefined;
}) => {
  const [screens, setScreens] = useState<any>();
  const value = getScreenDevice();
  let lastValue: any;

  useEffect(() => {
    setScreens(value);
  }, []);

  console.log({ screens, props });

  // const memoScreen = useCallback(() => screens, [screens])

  const parseValue = useCallback(() => {
    console.log('rerender');

    for (let i = 0; i < ranksDESC.length; i++) {
      const sub: string = ranksDESC[i];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const style = props?.[sub];
      if (style) lastValue = style;
      console.log({ lastValue });

      const isActive = screens?.[sub];
      if (isActive) return lastValue;
    }
    return lastValue;
  }, [screens]);
  return parseValue();
};

// Parse a date and return a formatted date.
export const parseDateTimeWithTimeZone = (date: Date | string) => {
  try {
    if (!date) return null;
    // Parse to Date
    const raw = new Date(date);

    // Get Time Zone
    const timeZone = raw.getTimezoneOffset() * 60 * 1000;

    // Plus timezone with current date
    const newD = raw.valueOf() + timeZone;

    return format(newD, DATE_FORMAT_TYPE.TYPE_4);
  } catch (error) {
    return null;
  }
};

export const parseDateTimeToJP = (date: any) => {
  try {
    const timeJapanese = new Date().toLocaleString(LOCALE, { timeZone: TIME_ZONE });
    date = date.hour(new Date(timeJapanese).getHours());
    date = date.minute(new Date(timeJapanese).getMinutes());
    date = date.second(new Date(timeJapanese).getSeconds());
    return date;
  } catch (error) {
    return null;
  }
};

export const formatTimeStampStringToDate = (date: Date | string, type: string) => {
  try {
    if (!date) return null;
    // Parse to Date
    return format(new Date(new Date(date).toLocaleString(LOCALE, { timeZone: TIME_ZONE })), type);
  } catch (error) {
    return null;
  }
};

export const formatStringToDate = (date: Date | string, type: string) => {
  try {
    if (!date) return null;
    // Parse to Date
    return format(new Date(date), type);
  } catch (error) {
    return null;
  }
};

export const getMinus = (num = 1) => {
  if (isNaN(num)) num = 1;
  return 1000 * num;
};

//check positive integers
export const isNumberPositive = (value: any) => {
  const reg = /^[0-9\b]+$/;
  if ((!Number.isNaN(value) && !reg.test(value)) || value === '' || value === '-') {
    return false;
  }
  return true;
};

// Checks if two objects are equal.
export const deepEqual = (x: any, y: any) => {
  if (x == y) {
    return true;
  } else if (typeof x == 'object' && x != null && typeof y == 'object' && y != null) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (const prop in x) {
      // eslint-disable-next-line no-prototype-builtins
      if (y?.hasOwnProperty(prop)) {
        if (!deepEqual(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
};

export const delay = (time: number) => {
  // do something...
  return new Promise<void>((resole, reject) => {
    setTimeout(() => {
      resole();
    }, time);
  });
};

export const isNil = (value: any) => {
  return value == null;
};

export const isFile = (input: any) => 'File' in window && input instanceof File;

export const randomUUID = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    // tslint:disable-next-line:no-bitwise
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
  );
};
