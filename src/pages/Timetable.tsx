import { useEffect, useState } from "react";
import TimetableCard from "../components/TimeTableCard";
import axios from "axios";
import { baseurl } from "../constants/url";
import Loader from "../components/Loader";
import { useParams } from "react-router";

export default function Timetable() {
  const { name } = useParams();
  const [timetableData, setTimetableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const renderTableRow = (
    row: {
      venue: string;
      id: number;
      scheduled_time: string;
      course: {
        id: number;
        course_code: string;
        year_taken: number;
        semester: number;
      };
    }[],
    index: number
  ) => {
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
              time="07:30 - 0830"
              className="bg-[#D62828]"
            />
          )}
        </td>
        <td className="h-[70px] w-[200px] border-b-[2px] border-r-[2px] border-black border-opacity-10">
          {row[1] && (
            <TimetableCard
              course={row[1]?.course.course_code}
              venue={row[1]?.venue}
              time="1230 - 1330"
              className="bg-[#FCBF49]"
            />
          )}
        </td>
        <td className="h-[70px] w-[200px] border-b-[2px] border-r-[2px] border-black border-opacity-10">
          {row[2] && (
            <TimetableCard
              course={row[2]?.course.course_code}
              venue={row[2]?.venue}
              time="1530 - 1630"
              className="bg-[#F77F00]"
            />
          )}
        </td>
        <td className="h-[70px] w-[200px] border-b-[2px] border-r-[2px] border-black border-opacity-10">
          {row[3] && (
            <TimetableCard
              course={row[3]?.course.course_code}
              venue={row[3]?.venue}
              time="1330 - 1430"
              className="bg-[#EAE2B7] text-black"
            />
          )}
        </td>
        <td className="h-[70px] w-[200px] border-b-[2px] border-black border-opacity-10">
          {row[4] && (
            <TimetableCard
              course={row[4]?.course.course_code}
              venue={row[4]?.venue}
              time="09:30 - 1030"
              className="bg-[#D62828]"
            />
          )}
        </td>
      </tr>
    );
  };

  useEffect(() => {
    axios
      .get(`${baseurl}/timetable/view?userId=${1}&name=${name}`)
      .then(async (res) => {
        let sortedData = [];
        for (let i = 0; i < 9; i++) {
          sortedData.push([
            res.data?.monday[i],
            res.data?.tuesday[i],
            res.data?.wednesday[i],
            res.data?.thursday[i],
            res.data?.friday[i],
          ]);
        };
        setTimetableData(sortedData);
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
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center p-2 min-h-lvh bg-[#F8F7F7] rounded-md">
      <div className="flex flex-col items-center w-full">
        <table className="w-[80%] bg-white border-[2px] border-black border-opacity-10 rounded-xl">
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
          <tbody>{timetableData.map(renderTableRow)}</tbody>
        </table>
      </div>
    </div>
  );
}
