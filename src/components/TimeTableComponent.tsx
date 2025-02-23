import { getPeriodTime } from "../functions/time";
import { TRow } from "../pages/Timetable";
import TimetableCard from "./TimeTableCard";

export function TimetableComponent({TimetableData}:{TimetableData: TRow[]}){
    const renderTableRow = (row: TRow, index: number) => {
        return (
          <tr key={index}>
            <td className="p-1 h-[70px] w-[120px] flex flex-col items-center justify-center border-b-[2px] border-r-[2px] border-black border-opacity-10">
              {index + 1}
            </td>
            <td className="h-[70px] w-[200px] border-b-[2px] border-r-[2px] border-black border-opacity-10">
              {row[0] && (
                <TimetableCard
                  course={row[0]?.course?.course_code}
                  venue={row[0]?.venue}
                  time={getPeriodTime(row[0]?.scheduled_time)}
                  className="bg-[#D62828] text-white"
                />
              )}
            </td>
            <td className="h-[70px] w-[200px] border-b-[2px] border-r-[2px] border-black border-opacity-10">
              {row[1] && (
                <TimetableCard
                  course={row[1]?.course.course_code}
                  venue={row[1]?.venue}
                  time={getPeriodTime(row[1]?.scheduled_time)}
                  className="bg-[#FCBF49] text-black"
                />
              )}
            </td>
            <td className="h-[70px] w-[200px] border-b-[2px] border-r-[2px] border-black border-opacity-10">
              {row[2] && (
                <TimetableCard
                  course={row[2]?.course.course_code}
                  venue={row[2]?.venue}
                  time={getPeriodTime(row[2]?.scheduled_time)}
                  className="bg-[#F77F00] text-white"
                />
              )}
            </td>
            <td className="h-[70px] w-[200px] border-b-[2px] border-r-[2px] border-black border-opacity-10">
              {row[3] && (
                <TimetableCard
                  course={row[3]?.course.course_code}
                  venue={row[3]?.venue}
                  time={getPeriodTime(row[3]?.scheduled_time)}
                  className="bg-[#EAE2B7] text-black"
                />
              )}
            </td>
            <td className="h-[70px] w-[200px] border-b-[2px] border-black border-opacity-10">
              {row[4] && (
                <TimetableCard
                  course={row[4]?.course.course_code}
                  venue={row[4]?.venue}
                  time={getPeriodTime(row[4]?.scheduled_time)}
                  className="bg-[#D62828] text-white"
                />
              )}
            </td>
          </tr>
        );
      };

    return(
        <div className="w-full flex justify-center p-2 min-h-lvh bg-[#F8F7F7] rounded-md">
            <div className="flex flex-col items-center w-full">
              <table
                id="timetable"
                className="w-[80%] bg-white border-[2px] border-black border-opacity-10 rounded-xl"
              >
                <thead>
                  <tr className="border-b-[2px] border-opacity-10 rounded-xl">
                    <th className="p-1 border-b-[2px] border-r-[2px] border-black border-opacity-10">
                      Period
                    </th>
                    <th className="p-1 border-b-[2px] border-r-[2px] border-black border-opacity-10">
                      Monday
                    </th>
                    <th className="p-1 border-b-[2px] border-r-[2px] border-black border-opacity-10">
                      Tuesday
                    </th>
                    <th className="p-1 border-b-[2px] border-r-[2px] border-black border-opacity-10">
                      Wednesday
                    </th>
                    <th className="p-1 border-b-[2px] border-r-[2px] border-black border-opacity-10">
                      Thursday
                    </th>
                    <th className="p-1">Friday</th>
                  </tr>
                </thead>
                <tbody>{TimetableData.map(renderTableRow)}</tbody>
              </table>
            </div>
          </div>
    )
}