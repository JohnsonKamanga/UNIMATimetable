import { useEffect, useState } from "react";
import { baseurl } from "../constants/url";
import axios from "axios";
import Loader from "../components/Loader";
import {
  formatRelative,
  isAfter,
  isBefore,
  isEqual,
  isFriday,
  isMonday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";

type TClassPeriod = {
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
const currentDateString =
  currentDate.getUTCFullYear() +
  "-" +
  (currentDate.getUTCMonth() < 10
    ? "0" + (currentDate.getUTCMonth() + 1)
    : currentDate.getUTCMonth() + 1) +
  "-" +
  currentDate.getUTCDate();

//list of today's periods
const times = [
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

function getCurrentPeriod() {
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

function getPeriodTime(period: string): string {
  switch (period) {
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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentTimetable, setCurrentTimeTable] = useState();
  const [todaysSchedule, setTodaysSchedule] = useState<any[]>([]);
  const [currentClass, setCurrentClass] = useState<TClassPeriod>();
  const [nextClass, setNextClass] = useState<TClassPeriod>();
  const [nextDaysSchedule, setnextDaysSchedule] = useState([]);
  const drawSchedule = (classPeriod: TClassPeriod | null, index: number) => {
    if (!classPeriod) {
      return;
    }
    //get the last digit in the scheduled time
    const period =
      classPeriod.scheduled_time[classPeriod.scheduled_time.length - 1];
    const time = getPeriodTime(period);

    return (
      <div key={index} className="bg-blue-500 p-2">
        <div>{classPeriod.course.course_code}</div>
        <div>{classPeriod.venue}</div>
        <div>{time}</div>
      </div>
    );
  };

  const setCurrentAndNextClass = (today: TClassPeriod[],nextDay: TClassPeriod[] , classIndex: number) => {
    let foundNext = false;
    if (
      today[classIndex - 1] &&
      (isEqual(Date.now(), times[classIndex - 1]) ||
        (isAfter(Date.now(), times[classIndex - 1]) &&
          isBefore(Date.now(), times[classIndex])))
    ) {
      setCurrentClass(today[classIndex - 1]);
      
    }

    //check for next class today
    for(let i = classIndex ; i < today.length ; i++){
      if(today[i]){
        setNextClass(today[i]);
        foundNext = true;
        break;
      }
    }

    //check for next class in the next day
    if(!foundNext){
      for(let i = 0 ; i < nextDay.length ; i++){
        if(nextDay[i]){
          setNextClass(nextDay[i]);
          foundNext = true;
          break;
        }
      }
    }
  };

  useEffect(() => {
    const c = getCurrentPeriod();
    axios
      .get(`${baseurl}/timetable/view?userId=${1}&name=1736632511674`)
      .then(async (res) => {
        setCurrentTimeTable(res.data);
        const now = Date.now();
        if (isMonday(now)) {
          setTodaysSchedule(res.data?.monday);
          setnextDaysSchedule(res.data?.tuesday);
          setCurrentAndNextClass(res.data?.monday, res.data?.tuesday, c);

        } else if (isTuesday(now)) {
          setTodaysSchedule(res.data?.tuesday);
          setnextDaysSchedule(res.data?.wednesday);
          setCurrentAndNextClass(res.data?.tuesday, res.data?.wednesday, c);

        } else if (isWednesday(now)) {
          setTodaysSchedule(res.data?.wednesday);
          setnextDaysSchedule(res.data?.thursday);
          setCurrentAndNextClass(res.data?.wednesday, res.data?.thursday, c);

        } else if (isThursday(now)) {
          setTodaysSchedule(res.data?.thursday);
          setnextDaysSchedule(res.data?.friday);
          setCurrentAndNextClass(res.data?.thursday, res.data?.friday, c);

        } else if (isFriday(now)) {
          setTodaysSchedule(res.data?.friday);
          setnextDaysSchedule(res.data?.monday);
          setCurrentAndNextClass(res.data?.friday, res.data?.monday, c);

        } else {
          setTodaysSchedule([]);
          setnextDaysSchedule(res.data?.monday);
          setCurrentAndNextClass([], res.data?.monday, c);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("An error occured: ", err);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-grow">
        <div className="h-full w-full flex items-center justify-center bg-black bg-opacity-25">
          <Loader message="Fetching Data" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-grow flex-col bg-[#F8F7F7]">
      <div className="min-h-full flex flex-col">
      <div className="h-[200px] grid grid-cols-2">
        <div className="p-1">
          <h2 className="font-bold text-xl mb-2">Current Class</h2>
          <div>
            {currentClass ? (
              <div>
                <div>Code: {currentClass.course.course_code}</div>
                <div>Venue: {currentClass.venue}</div>
                <div>Time: {getPeriodTime(currentClass.scheduled_time[currentClass.scheduled_time.length - 1])}</div>
              </div>
            ) : (
              <div>no class on going</div>
            )}
          </div>
        </div>
        <div className="p-1">
          <h2 className="font-bold text-xl mb-2">Next class</h2>
          <div>{nextClass ? (
              <div>
                <div>Code: {nextClass.course.course_code}</div>
                <div>Venue: {nextClass.venue}</div>
                <div>Time: {getPeriodTime(nextClass.scheduled_time[nextClass.scheduled_time.length - 1])}</div>
              </div>
            ) : (
              <div>No class to be scheduled next</div>
            )}</div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="p-2 border-r-[1px] border-black">
          <h2 className="font-bold text-xl mb-2">Today's classes</h2>
          <div className="flex flex-col gap-y-2">
            {todaysSchedule.map(drawSchedule)}
          </div>
        </div>
        <div className="p-2">
          <h2 className="font-bold text-xl mb-2">Next Day's classes</h2>
          <div className="flex flex-col gap-y-2">
            {nextDaysSchedule.map(drawSchedule)}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
