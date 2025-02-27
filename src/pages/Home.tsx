import { useContext, useEffect, useState } from "react";
import { baseurl } from "../constants/url";
import axios from "axios";
import Loader from "../components/Loader";
import {
  isAfter,
  isBefore,
  isEqual,
  isFriday,
  isMonday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";
import NextClassCard from "../components/NextClassCard";
import { getCurrentPeriod, TClassPeriod, times } from "../functions/time";
import CurrentClassCard from "../components/CurrentClassCard";
import ListClassCard from "../components/ListClassCard";
import { UserContext } from "../user-context";

export default function Home() {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [currentTimetable, setCurrentTimeTable] = useState();
  const [todaysSchedule, setTodaysSchedule] = useState<any[]>([]);
  const [currentClass, setCurrentClass] = useState<TClassPeriod>();
  const [lastClassForToday, setLastClassForToday] = useState<TClassPeriod>();
  const [nextClass, setNextClass] = useState<TClassPeriod>();
  const [nextDaysSchedule, setnextDaysSchedule] = useState<any[]>([]);
  const drawSchedule = (classPeriod: TClassPeriod | null, index: number) => {
    if (!classPeriod) {
      return;
    }
    return (
      <div key={index} className={`col-start-${index + 1}`}>
        <ListClassCard classPeriod={classPeriod} />
      </div>
    );
  };

  const setCurrentAndNextClass = (
    today: TClassPeriod[],
    nextDay: TClassPeriod[],
    currentPeriod: number
  ) => {
    let foundNext = false;
    const endOfTeaching = new Date(Date.now());
    endOfTeaching.setHours(16, 30, 0);
    if (
      today[currentPeriod - 1] &&
      (isEqual(Date.now(), times[currentPeriod - 1]) ||
        (isAfter(Date.now(), times[currentPeriod - 1]) &&
          isBefore(Date.now(), times[currentPeriod])))
    ) {
      setCurrentClass(today[currentPeriod - 1]);
    } else {
      setCurrentClass(undefined);
    }

    //check for next class today. periods start from 1, so if it's 0 then it is outside normal time
    if (currentPeriod !== 0 || isBefore(Date.now(), endOfTeaching))
      for (let i = currentPeriod; i < today.length; i++) {
        if (today[i]) {
          setNextClass(today[i]);
          foundNext = true;
          break;
        }
      }

    //check for next class in the next day
    if (!foundNext) {
      for (let i = 0; i < nextDay.length; i++) {
        if (nextDay[i]) {
          setNextClass(nextDay[i]);
          foundNext = true;
          break;
        }
      }
    }

    //find lastClass for today
    if (today.length > 0)
      for (let i = today.length - 1; i < today.length; i--) {
        if (today[i]) {
          setLastClassForToday(today[i]);
          break;
        }
      }
  };

  useEffect(() => {
    const c = getCurrentPeriod();
    console.log('lodaing...')
    axios
      .get(`${baseurl}/timetable/view/current?userId=${user?.id}`)
      .then(async (res) => {
        console.log('fetched...')
        if(!res.data){
          console.log('no data')
          setTodaysSchedule([]);
          setnextDaysSchedule([]);
          setLoading(false)
          return;
        }
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
        alert("error");
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
        <div className="h-fit backdrop-blur-lg p-2 grid grid-cols-2">
          <div className="p-1 flex flex-col items-center">
            <h2 className="font-bold text-xl mb-2">Current Class</h2>
            <div>
              {currentClass ? (
                <CurrentClassCard
                  currentClass={currentClass}
                  todaysSchedule={todaysSchedule}
                  nextDaysSchedule={nextDaysSchedule}
                  setCurrentAndNextClass={setCurrentAndNextClass}
                />
              ) : (
                <div>
                  <p className="text-black text-lg font-semibold text-opacity-45 ">
                    No class on going
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="p-1 flex flex-col items-center">
            <h2 className="font-bold text-xl mb-2">Next class</h2>
            <div>
              {nextClass ? (
                <NextClassCard
                  code={nextClass.course.course_code}
                  venue={nextClass.venue}
                  time={nextClass.scheduled_time}
                  lastClassTime={lastClassForToday?.scheduled_time}
                  todaysSchedule={todaysSchedule}
                  nextDaysSchedule={nextDaysSchedule}
                  setCurrentAndNextClass={setCurrentAndNextClass}
                />
              ) : (
                <div>No class to be scheduled next</div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-2 border-r-[1px] border-black">
            <h2 className="font-bold text-xl mb-2">Today's classes</h2>
            <div className="grid grid-cols-5 rows-2 items-center gap-2">
              {todaysSchedule.length > 0 ? (
                <>{todaysSchedule.map(drawSchedule)}</>
              ) : (
                <div className="col-span-5">
                  <p className="text-black text-lg font-semibold text-opacity-45 ">
                    No classes today
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="p-2">
            <h2 className="font-bold text-xl mb-2">Next Day's classes</h2>
            <div className="grid grid-cols-5 rows-2 items-center gap-2">
              {nextDaysSchedule.map(drawSchedule)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
