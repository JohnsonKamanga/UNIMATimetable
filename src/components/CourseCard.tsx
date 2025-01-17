import { getDayAndPeriodTime } from "../functions/time";

export type TCourseInfo = {
  id: number;
  course_code: string;
  year_taken: number;
  semester: number;
  schedule: { venue: string; scheduled_time: string }[];
};

export function CourseCard({ courseInfo }: { courseInfo: TCourseInfo }) {
  const drawSchedule = (
    schedule: { venue: string; scheduled_time: string },
    index: number
  ) => {
    return (
      <li key={index} className="p-1">
        <div>
          <div>
            <b>Venue:</b> <span className="font-thin">{schedule.venue}</span>
          </div>
          <div>
            <b>Time:</b>{" "}
            <span className="font-thin">
              {getDayAndPeriodTime(schedule.scheduled_time)}
            </span>
          </div>
        </div>
      </li>
    );
  };
  return (
    <div className="flex flex-row gap-x-2 border-[1px] bg-[#D62828] text-white border-black border-opacity-25 p-2 rounded-xl shadow-xl">
      <div className="flex flex-col gap-y-2 min-w-[160px]">
        <div className="flex items-center gap-x-2 p-[9px] bg-white bg-opacity-20 w-fit border-black border-[1px] border-opacity-30 shadow-md rounded-3xl">
          <b>Course:</b>{" "}
          <span className="font-thin"> {courseInfo.course_code}</span>
        </div>
        <div className="flex items-center gap-x-2 p-[9px] bg-white bg-opacity-20 w-fit border-black border-[1px] border-opacity-30 shadow-md rounded-3xl">
          <b>Semester:</b>{" "}
          <span className="font-thin">{courseInfo.semester}</span>
        </div>
        <div className="flex items-center gap-x-2 p-[9px] bg-white bg-opacity-20 w-fit border-black border-[1px] border-opacity-30 shadow-md rounded-3xl">
          <b>Year:</b>{" "}
          <span className="font-thin">{courseInfo.year_taken}</span>
        </div>
      </div>
      <div className="bg-white bg-opacity-20 border-black border-[1px] border-opacity-20 rounded-lg shadow-md h-full w-[350px]">
        <ul className=" p-1">{courseInfo.schedule.map(drawSchedule)}</ul>
      </div>
    </div>
  );
}
