import { isAfter, isBefore, isEqual } from "date-fns";

export type TClassPeriod = {
  id: number;
  scheduled_time: string;
  venue: string;
  course: {
    id: number;
    course_code: string;
    year_taken: number;
    semester: number;
  };
};

const currentDate = new Date(Date.now());
export const currentDateString =
  currentDate.getUTCFullYear() +
  "-" +
  (currentDate.getUTCMonth() < 10
    ? "0" + (currentDate.getUTCMonth() + 1)
    : currentDate.getUTCMonth() + 1) +
  "-" +
  currentDate.getUTCDate();

//list of today's periods
export const times = [
  currentDateString + "T07:30:00",
  currentDateString + "T08:30:00",
  currentDateString + "T09:30:00",
  currentDateString + "T10:30:00",
  currentDateString + "T11:30:00",
  currentDateString + "T12:30:00",
  currentDateString + "T13:30:00",
  currentDateString + "T14:30:00",
  currentDateString + "T15:30:00",
  currentDateString + "T16:30:00",
];

export function getCurrentPeriod() {
  //Is between 0730 and 0830
  if (
    isEqual(Date.now(), times[0]) ||
    (isAfter(Date.now(), times[0]) && isBefore(Date.now(), times[1]))
  ) {
    return 1;
  }

  //Is between 0830 and 0930
  if (
    isEqual(Date.now(), times[1]) ||
    (isAfter(Date.now(), times[1]) && isBefore(Date.now(), times[2]))
  ) {
    return 2;
  }

  //Is between 0930 and 1030
  if (
    isEqual(Date.now(), times[2]) ||
    (isAfter(Date.now(), times[2]) && isBefore(Date.now(), times[3]))
  ) {
    return 3;
  }

  //Is between 1030 and 1130
  if (
    isEqual(Date.now(), times[3]) ||
    (isAfter(Date.now(), times[3]) && isBefore(Date.now(), times[4]))
  ) {
    return 4;
  }

  //Is between 1130 and 1230
  if (
    isEqual(Date.now(), times[4]) ||
    (isAfter(Date.now(), times[4]) && isBefore(Date.now(), times[5]))
  ) {
    return 5;
  }

  //Is between 1230 and 1330
  if (
    isEqual(Date.now(), times[5]) ||
    (isAfter(Date.now(), times[5]) && isBefore(Date.now(), times[6]))
  ) {
    return 6;
  }

  //Is between 1330 and 1430
  if (
    isEqual(Date.now(), times[6]) ||
    (isAfter(Date.now(), times[6]) && isBefore(Date.now(), times[7]))
  ) {
    return 7;
  }

  //Is between 1430 and 1530
  if (
    isEqual(Date.now(), times[7]) ||
    (isAfter(Date.now(), times[7]) && isBefore(Date.now(), times[8]))
  ) {
    return 8;
  }

  //Is between 1530 and 1630
  if (
    isEqual(Date.now(), times[8]) ||
    (isAfter(Date.now(), times[8]) && isBefore(Date.now(), times[9]))
  ) {
    return 9;
  }

  return 0;
}

export function getPeriodTime(period: string): string {
  const p = period.length > 1 ? period[period.length - 1] : period
  switch (p) {
    case "1": {
      return "07:30 - 08:30";
    }
    case "2": {
      return "08:30 - 09:30";
    }
    case "3": {
      return "09:30 - 10:30";
    }
    case "4": {
      return "10:30 - 11:30";
    }
    case "5": {
      return "11:30 - 12:30";
    }
    case "6": {
      return "12:30 - 13:30";
    }
    case "7": {
      return "13:30 - 14:30";
    }
    case "8": {
      return "14:30 - 15:30";
    }
    case "9": {
      return "15:30 - 16:30";
    }
    default: {
      return "Class is scheduled outside normal time";
    }
  }
}

export function getPeriodStartTime(period: string): string {
  switch (period) {
    case "1": {
      return "07:30";
    }
    case "2": {
      return "08:30";
    }
    case "3": {
      return "09:30";
    }
    case "4": {
      return "10:30";
    }
    case "5": {
      return "11:30";
    }
    case "6": {
      return "12:30";
    }
    case "7": {
      return "13:30";
    }
    case "8": {
      return "14:30";
    }
    case "9": {
      return "15:30";
    }
    case "10": {
      return "16:30";
    }
    default: {
      return "Class is scheduled outside normal time";
    }
  }
}

export function getDayAndPeriodTime(dayAndPeriod: string){
  const day = Number(dayAndPeriod) < 10 ? "0" : dayAndPeriod[0];
  const period = getPeriodTime(dayAndPeriod[dayAndPeriod.length - 1]);
  switch(day){

  case "0": {
    return "Monday from " + period;
  }
  case "1": {
    return "Tuesday from " + period;
  }
  case "2": {
    return "Wednesday from " + period;
  }
  case "3": {
    return "Thursday from " + period;
  }
  case "4": {
    return "Friday from " + period;
  }
}
}
