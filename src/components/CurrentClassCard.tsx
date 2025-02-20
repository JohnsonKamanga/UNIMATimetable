import { BookOpen, Building2, Clock4 } from "lucide-react";
import {
  getCurrentPeriod,
  getPeriodStartTime,
  getPeriodTime,
  TClassPeriod,
} from "../functions/time";
import { useEffect, useState } from "react";

export default function CurrentClassCard({
  currentClass,
  todaysSchedule,
  nextDaysSchedule,
  setCurrentAndNextClass,
}: {
  currentClass: TClassPeriod;
  todaysSchedule: any[];
  nextDaysSchedule: any[];
  setCurrentAndNextClass: (
    today: TClassPeriod[],
    nextDay: TClassPeriod[],
    currentPeriod: number
  ) => void;
}) {
  const [remTime, setRemTime] = useState("");

  const calculateRemainingTime = (time: string) => {
    const startTimeSlot = time[time.length - 1];
    const endTimeSlot = String(Number(startTimeSlot) + 1);
    const endTime = getPeriodStartTime(endTimeSlot);
    const endOfPeriod = new Date(Date.now());
    endOfPeriod.setHours(
      Number(endTime[0] + endTime[1]),
      Number(endTime[3] + endTime[4]),
      0
    );
    const delta = endOfPeriod.getTime() - Date.now();
    if (delta <= 0) {
      setCurrentAndNextClass(
        todaysSchedule,
        nextDaysSchedule,
        getCurrentPeriod()
      );
      return "00:00:00";
    }
    const hours = Math.floor(delta / 3600000);
    const rem1 = delta - hours * 3600000;
    const mins = Math.floor(rem1 / 60000);
    const rem2 = rem1 - mins * 60000;
    const secs = Math.floor(rem2 / 1000);
    return (
      (hours < 10 ? "0" + hours : hours) +
      ":" +
      (mins < 10 ? "0" + mins : mins) +
      ":" +
      (secs < 10 ? "0" + secs : secs)
    );
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      const t = calculateRemainingTime(currentClass.scheduled_time);
      setRemTime(t);
    }, 1000);

    return () => clearInterval(timeout);
  }, [remTime]);

  return (
    <div className="flex flex-row gap-x-2 border-[1px] text-white card-bg-color-1 border-black w-fit p-3 rounded-xl border-opacity-20 shadow-lg">
      <div className="flex flex-col min-w-[160px] gap-y-1">
        <div className="flex items-center gap-x-2 p-[9px] bg-white bg-opacity-20 w-fit border-black border-[1px] border-opacity-30 shadow-lg rounded-3xl">
          <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
            <BookOpen size={16} />
          </div>
          <p className="font-bold">{currentClass.course.course_code}</p>
        </div>
        <div className="flex items-center gap-x-2 p-[9px] bg-white bg-opacity-20 w-fit border-black border-[1px] border-opacity-30 shadow-lg rounded-3xl">
          <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
            <Building2 size={16} />
          </div>
          <p className="font-bold">{currentClass.venue}</p>
        </div>
        <div className="flex items-center gap-x-2 p-[9px] bg-white bg-opacity-20 w-fit border-black border-[1px] border-opacity-30 shadow-lg rounded-3xl">
          <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
            <Clock4 size={16} />
          </div>
          <p className="font-bold">
            {getPeriodTime(
              currentClass.scheduled_time[
                currentClass.scheduled_time.length - 1
              ]
            )}
          </p>
        </div>
      </div>
      <div className="w-[145px] text-center aspect-square rounded-lg bg-white bg-opacity-40 border-[1px] border-black border-opacity-25 shadow-md">
        <div className="font-bold">Time until class ends</div>
        <div className="font-semibold text-3xl">
          {remTime[0]}
          {remTime[1]}
        </div>
        <div className="font-medium text-2xl">
          {remTime[3]}
          {remTime[4]}
        </div>
        <div className="font-normal text-xl">
          {remTime[6]}
          {remTime[7]}
        </div>
      </div>
    </div>
  );
}
