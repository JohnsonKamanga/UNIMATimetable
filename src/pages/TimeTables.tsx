import axios from "axios";
import { useEffect, useState } from "react";
import { baseurl } from "../constants/url";
import { NavLink } from "react-router";
import { Theme } from "../constants/theme";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../components/Loader";
import { TimetableGenerationForm } from "../components/TimetableGenerationForm";
import { formatRelative } from "date-fns";

export default function TimeTables() {
  const user = {
    id: 1,
  };
  const [loading, setLoading] = useState(true);
  const [timetables, setTimeTables] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const renderTimetablesList = (
    timetable: {
      id: number;
      name: string;
      academic_year: string;
      semester: string;
      created_at: string;
      last_modified: string;
    },
    index: number
  ) => {
    return (
      <motion.tr
        whileHover={{
          scale: 1.005,
        }}
        key={index}
        className="hover:bg-[#FCBF49] hover:shadow-md hover:bg-opacity-20 cursor-default"
      >
        <td className="p-2">
          <div className="w-full flex items-center justify-center">
            <NavLink
              className="hover:text-white"
              to={`/timetable/${timetable.name}`}
            >
              {timetable.name}
            </NavLink>
          </div>
        </td>
        <td className="p-2">
          <div className="w-full flex items-center justify-center">
            {timetable.academic_year}
          </div>
        </td>
        <td className="p-2">
          <div className="w-full flex items-center justify-center">
            {timetable.semester}
          </div>
        </td>
        <td className="p-2">
          <div className="w-full flex items-center justify-center">
            {formatRelative(timetable.last_modified, Date.now())}
          </div>
        </td>
      </motion.tr>
    );
  };

  useEffect(() => {
    axios
      .get(`${baseurl}/timetable/${user.id}`)
      .then((res) => {
        setTimeTables(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("An error occured: ", err);
      });
  }, []);

  if (loading) {
    return (
      <div className={`bg-[${Theme.light.backgroundColor}] flex flex-col flex-grow p-2`}
      >
        <div className="h-full w-full flex items-center justify-center">
          <Loader message="Fetching Timetables" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[${Theme.light.backgroundColor}] flex flex-col flex-grow p-2`}
    >
      <h1 className="p-1 text-3xl font-semibold mb-5">Your Timetables</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Academic Year</th>
            <th>Semester</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>{timetables.map(renderTimetablesList)}</tbody>
      </table>
      <div className="absolute bottom-[95px] right-[85px]">
        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          whileHover={{
            scale: 1.1,
          }}
          onClick={() => {
            setFormVisible(true);
          }}
          className="bg-[#FCBF49] relative z-10 p-3 rounded-full border-[2px] border-black border-opacity-10"
        >
          <Plus color="white" />
        </motion.button>
      </div>
      <AnimatePresence>
        {formVisible && (
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              scale: 0,
            }}
            className="absolute top-0 left-0 backdrop-blur-md z-30 flex flex-col h-full w-full flex-grow items-center justify-center bg-black bg-opacity-40"
          >
            <TimetableGenerationForm
              setFormVisible={setFormVisible}
              userid={user.id}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
