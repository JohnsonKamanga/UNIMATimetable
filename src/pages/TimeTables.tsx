import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseurl } from "../constants/url";
import { NavLink } from "react-router";
import { Theme } from "../constants/theme";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function TimeTables() {
  const user = {
    id: 1,
  };
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [timetables, setTimeTables] = useState([]);
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
      <tr key={index}>
        <td>
          <div className="w-full flex items-center justify-center">
            <NavLink
              className="hover:text-red-500"
              to={`/timetable/${timetable.name}`}
            >
              {timetable.name}
            </NavLink>
          </div>
        </td>
        <td>
          <div className="w-full flex items-center justify-center">
            {timetable.academic_year}
          </div>
        </td>
        <td>
          <div className="w-full flex items-center justify-center">
            {timetable.semester}
          </div>
        </td>
        <td>
          <div className="w-full flex items-center justify-center">
            {timetable.last_modified}
          </div>
        </td>
      </tr>
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
    window.addEventListener("message",async (ev) => {
      console.log("message event triggered");
      const m = (
        await axios.get(
          "https://students.unima.ac.mw/pages/timetable"
        )
      ).data;
      console.log('timetable: ', m);
      if (ev?.origin !== "http://localhost:5173") {
        console.log(ev.origin);
        console.log("returning...");
        setMessage("none");
        return;
      }

      console.log("message recieved: ", ev?.data);
      setMessage(ev.data);
    });

    return () => {
      window.removeEventListener("message", (ev) => {
        console.log("message event triggered");
        if (ev?.origin !== "http://localhost:5173") {
          console.log("returning...");
          setMessage("none");
          return;
        }

        console.log("message recieved: ", ev?.data);
        setMessage(ev.data);
      });
    };
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div
      className={`bg-[${Theme.light.backgroundColor}] flex flex-col flex-grow p-2`}
    >
      <h1>list of timetables</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>academic year</th>
            <th>semester</th>
            <th>last modified</th>
          </tr>
        </thead>
        <tbody>{timetables.map(renderTimetablesList)}</tbody>
      </table>
      <div className="absolute bottom-[95px] right-[85px]">
        <AnimatePresence>
          {showPopUp && (
            <motion.div
              variants={{
                hidden: {
                  scale: 0,
                },
                show: {
                  scale: 1,
                },
              }}
              exit="hidden"
              initial="hidden"
              animate="show"
              className="z-20 flex flex-col gap-y-1 text-lg bg-[#FCBF49] rounded-xl text-white font-semibold p-5 text-center absolute w-[200px] -left-[80px] -top-[120px]"
            >
              <div className="hover:cursor-pointer">Create from scratch</div>
              <div
                className="hover:cursor-pointer"
                onClick={async () => {
                  try {
                    // const w = window.open(
                    //   "https://students.unima.ac.mw/login.php",
                    //   "University of Malawi Students Portal",
                    //   "popup"
                    // );
                    const w = window.open(
                      "https://students.unima.ac.mw",
                      "University of Malawi Students Portal",
                      "popup"
                    );
                    console.log("checking window");
                    // w.addEventListener("load",(ev) => {
                    //   console.log('page loaded')
                    //   w.addEventListener("submit", async (e) => {
                    //     w.location = 'https://students.unima.ac.mw/pages/timetable/';
                    //     const message = JSON.stringify(
                    //       await (
                    //         await w.fetch(
                    //           "https://students.unima.ac.mw/pages/timetable/"
                    //         )
                    //       ).json()
                    //     )
                    //   console.log('fetched message: ', message)
                    //     w.postMessage(message, `http://localhost:5137/timetable`);
                    //   })
                    // })
                    //const message = JSON.stringify((await axios.get("https://students.unima.ac.mw/pages/timetable/")).data)

                    //console.log('fetched message: ', message)
                    // w?.addEventListener("submit", (e) => {
                    //   w.addEventListener("load", async () => {
                    //     const m = (
                    //       await axios.get(
                    //         "https://students.unima.ac.mw/pages/timetable"
                    //       )
                    //     ).data;
                    //     w?.opener.postMessage(m, "http://localhost:5173");
                    //     setMessage(m);
                    //   });
                    // });
                    // const m = (
                    //   await axios.get(
                    //     "https://students.unima.ac.mw/pages/timetable"
                    //   )
                    // ).data;
                    w?.opener.postMessage('hello world', "http://localhost:5173");
                    console.log("message sent");
                  } catch (err) {
                    console.error(
                      "An error occured during popup generation: ",
                      err
                    );
                  }
                }}
              >
                generate portal
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          whileHover={{
            scale: 1.1,
          }}
          onClick={() => {
            setShowPopUp(!showPopUp);
          }}
          className="bg-[#FCBF49] relative z-10 p-3 rounded-full border-[2px] border-black border-opacity-10"
        >
          <Plus color="white" />
        </motion.button>
      </div>
      <>
        <iframe
          ref={iframeRef}
          className="aspect-video"
          src="https://students.unima.ac.mw/pages/timetable"
        />
        <button
          onClick={(ev) => {
            if (!iframeRef.current) {
              console.log("no ref");
              return;
            }
            console.log("your node: ", iframeRef.current.DOCUMENT_NODE);
            iframeRef.current.contentWindow?.parent.postMessage(
              "hello from iframe",
              "http://localhost:5173"
            );
            console.log("iframe message sent");
          }}
          className="bg-red-900 rounded-xl p-2"
        >
          click
        </button>
        {message ? <p>{message}</p> : <p>No message</p>}
      </>
    </div>
  );
}
