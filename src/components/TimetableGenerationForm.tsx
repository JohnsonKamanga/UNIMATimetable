import axios from "axios";
import { FormEvent, SetStateAction, useState } from "react";
import { baseurl } from "../constants/url";

export function TimetableGenerationForm({ userid, setFormVisible }: { userid: number, setFormVisible: React.Dispatch<SetStateAction<boolean>> }) {
  const [password, SetPassword] = useState("");
  const [username, setUsername] = useState("");
  const [timetableName, setTimetableName] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = (
        await axios.post(`${baseurl}/timetable`, {
          username,
          password,
          timetableName,
          userid: userid,
        })
      ).data;
      console.log("message: ", res);
    } catch (err) {
      console.error("An error occured during timetable fetching: ", err);
    }
  };
  return (
        <form className="form-style" onSubmit={handleSubmit}>
          <h2 className="text-xl text-center font-bold">
            Create A New Timetable Using The Student Portal
          </h2>
          <div className="form-input-field-style">
            <label className="form-label-style">Username</label>
            <input onChange={(e)=>{
                setUsername(e.target.value);
            }} 
            className="form-input-style" placeholder="Your username" />
          </div>
          <div className="form-input-field-style">
            <label className="form-label-style">Password</label>
            <input onChange={(e)=>{
                SetPassword(e.target.value);
            }} 
            className="form-input-style" placeholder="Your password" />
          </div>
          <div className="form-input-field-style">
            <label className="form-label-style">Timetable Name</label>
            <input
            onChange={(e)=>{
                setTimetableName(e.target.value);
            }}
              className="form-input-style"
              placeholder="Name of new timetable"
            />
          </div>
          <div className="flex flex-row gap-x-5">
            <button 
            onClick={(e)=>{
                e.preventDefault();
                setFormVisible(false);
            }}
            className="form-button bg-[#ff0000] hover:bg-[#dd2f2f] transition-colors text-white">
              Cancel
            </button>
            <button
              type="submit"
              className="form-button border-[1px] hover:bg-black hover:bg-opacity-5 transition-colors border-black"
            >
              Submit
            </button>
          </div>
        </form>
  );
}
