import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../constants/url";
import Loader from "../components/Loader";
import { NavLink, useParams } from "react-router";
import { UserContext } from "../user-context";
import { TimetableComponent } from "../components/TimeTableComponent";

export type TRow = {
  venue: string;
  id: number;
  scheduled_time: string;
  course: {
    id: number;
    course_code: string;
    year_taken: number;
    semester: number;
  };
}[];

export default function Timetable() {
  const { name } = useParams();
  const [timetableData, setTimetableData] = useState<any[]>([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseurl}/timetable/view?userId=${user?.id}&name=${name}`)
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
        }
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
          <Loader message="Fetching Timetable Data" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavLink to={`/download/${name}`} className="p-2">
        Download
      </NavLink>
      <TimetableComponent TimetableData={timetableData} />
    </div>
  );
}
