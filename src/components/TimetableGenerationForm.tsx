import axios from "axios";
import { SetStateAction } from "react";
import { baseurl } from "../constants/url";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  timetableName: yup.string().required("Timetable name is required"),
}).required()

export function TimetableGenerationForm({ userid, setFormVisible }: { userid: number, setFormVisible: React.Dispatch<SetStateAction<boolean>> }) {
  const {register, formState: {errors}, handleSubmit} = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data: {username:string;password:string;timetableName:string;}) => {
    try {
      const res = (
        await axios.post(`${baseurl}/timetable`, {
          ...data,
          userid: userid,
        })
      ).data;
      console.log("message: ", res);
    } catch (err) {
      console.error("An error occured during timetable fetching: ", err);
    }
  };
  return (
        <form className="form-style" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-xl text-center font-bold">
            Create A New Timetable Using The Student Portal
          </h2>
          <div className="form-input-field-style">
            <label className="form-label-style">Username</label>
            <input 
            {...register('username')}
            className="form-input-style" placeholder="Your username" />
            <p className="text-[#ff0000] font-semibold">{errors.username?.message}</p>
          </div>
          <div className="form-input-field-style">
            <label className="form-label-style">Password</label>
            <input 
            {...register('password')}
            className="form-input-style" placeholder="Your password" />
            <p className="text-[#ff0000] font-semibold">{errors.password?.message}</p>
          </div>
          <div className="form-input-field-style">
            <label className="form-label-style">Timetable Name</label>
            <input
            {...register('timetableName')}
              className="form-input-style"
              placeholder="Name of new timetable"
            />
            <p className="text-[#ff0000] font-semibold">{errors.timetableName?.message}</p>
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
