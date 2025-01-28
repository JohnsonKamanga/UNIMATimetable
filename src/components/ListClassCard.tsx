import { BookOpen, Building2, Clock4 } from "lucide-react";
import { getPeriodTime, TClassPeriod } from "../functions/time";

export default function ListClassCard({
  classPeriod,
}: {
  classPeriod: TClassPeriod;
}) {
  //get the last digit in the scheduled time
  const period =
    classPeriod.scheduled_time[classPeriod.scheduled_time.length - 1];
  const time = getPeriodTime(period);

  return (
    <div className="flex flex-col gap-y-1 text-xs bg-black bg-opacity-25 text-white rounded-xl border-black border-[1px] border-opacity-35 shadow-xl p-1">
      <div className="flex flex-row bg-white bg-opacity-20 items-center gap-x-1 p-2 border-black border-[1px] border-opacity-25 shadow-xl w-fit rounded-full">
        <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
          <BookOpen size={14} />
        </div>
        <p>{classPeriod.course.course_code}</p>
      </div>
      <div className="flex flex-row bg-white bg-opacity-20 items-center gap-x-1 p-2 border-black border-[1px] border-opacity-25 shadow-xl w-fit rounded-full">
        <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
          <Building2 size={14} />
        </div>
        <p>{classPeriod.venue}</p>
      </div>
      <div className="flex flex-row bg-white bg-opacity-20 items-center gap-x-1 p-2 border-black border-[1px] border-opacity-25 shadow-xl w-fit rounded-full">
        <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
          <Clock4 size={14} />
        </div>
        <p>{time}</p>
      </div>
    </div>
  );
}
