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
    <div className="grid grid-cols-2 grid-rows-2 gap-2 w-[320px] rounded-xl border-black border-[1px] border-opacity-15 shadow-lg bg-white p-2">
      <div className="flex flex-row  bg-[#D62828] text-white gap-x-2 p-2 border-black border-[1px] border-opacity-25 shadow-xl w-fit rounded-full">
        <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
          <BookOpen size={16} />
        </div>
        <p>{classPeriod.course.course_code}</p>
      </div>
      <div className="flex flex-row bg-[#FCBF49] text-white gap-x-2 p-2 border-black border-[1px] border-opacity-25 shadow-xl w-fit rounded-full">
        <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
          <Building2 size={16} />
        </div>
        <p>{classPeriod.venue}</p>
      </div>
      <div className="flex flex-row bg-[#F77F00] text-white gap-x-2 p-2 border-black border-[1px] border-opacity-25 shadow-xl w-fit rounded-full">
        <div className="border-[2px] border-white rounded-full p-1 flex items-center justify-center">
          <Clock4 size={16} />
        </div>
        <p>{time}</p>
      </div>
    </div>
  );
}
