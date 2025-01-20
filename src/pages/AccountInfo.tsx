import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseurl } from "../constants/url";
import Loader from "../components/Loader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type TUser = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup.string().required("Email is required").email('Email must be valid'),
  })
  .required();

export default function AccountInfo() {
  const { username } = useParams();
  const {
      register,
      formState: { errors },
      handleSubmit,
    } = useForm({
      resolver: yupResolver(schema),
    });
  const [user, setUser] = useState<TUser>();
  const [updateInfo, setUpdateInfo] = useState(false)
  const [loading, setLoading] = useState(true);
  const onSubmit = async (data: {
    username: string;
    password: string;
    timetableName: string;
    current: boolean;
  }) => {
    setLoading(true);
    try {
      const res = (
        await axios.put(`${baseurl}/user`, {
          ...data,
          id: user?.id,
        })
      ).data;
      console.log("message: ", res);
      setLoading(false);
    } catch (err) {
      console.error("An error occured during timetable fetching: ", err);
    }
  };

  useEffect(() => {
    axios
      .get(`${baseurl}/user/${username}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("An error occured when fetching user info: ", err);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-grow">
        <div className="h-full w-full flex items-center justify-center bg-black bg-opacity-25">
          <Loader message="Fetching User Info" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow p-2">
      {user ? (
        <form className="w-fit p-10 bg-white border-[1px] border-black border-opacity-20 flex flex-col rounded-lg">
          <div className=" w-[600px] p-2 flex flex-col">
        <label className="form-label-style">First name</label>
        <input
          {...register("last_name")}
          className="form-input-style"
          placeholder={user.first_name}
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.first_name?.message}
        </p>
      </div>
          <div className=" w-[600px] p-2 flex flex-col">
        <label className="form-label-style">Last name</label>
        <input
          {...register("last_name")}
          className="form-input-style"
          placeholder={user.last_name}
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.last_name?.message}
        </p>
      </div>
          <div className=" w-[600px] p-2 flex flex-col">
        <label className="form-label-style">Username</label>
        <input
          {...register("username")}
          className="form-input-style"
          placeholder={user.username}
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.username?.message}
        </p>
      </div>
      <div className=" w-[600px] p-2 flex flex-col">
        <label className="form-label-style">Email</label>
        <input
          {...register("email")}
          className="form-input-style"
          placeholder={user.email}
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.email?.message}
        </p>
      </div>
      <AnimatePresence>
        {loading ? (
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
            className="form-button border-black border-[1px] w-full flex items-center justify-center"
          >
            <Loader2 className="animate-spin" color="black" />
          </motion.div>
        ) : (
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
            className="flex flex-row justify-between"
          >
            <button
            aria-disabled={!updateInfo}
              onClick={(e) => {
                e.preventDefault();
                setUpdateInfo(false);
              }}
              className="form-button aria-disabled:opacity-60 aria-disabled:bg-[#ff0000] aria-disabled:cursor-default bg-[#ff0000] hover:bg-[#dd2f2f] transition-colors text-white"
            >
              Cancel
            </button>{
              updateInfo?
            <button
              type="submit"
              className="form-button border-[1px] hover:bg-black hover:bg-opacity-5 transition-colors border-black"
            >
              Submit
            </button>
          :
          <button
          onClick={(e)=>{
            e.preventDefault();
            setUpdateInfo(true);
          }}
          className="form-button border-[1px] hover:bg-black hover:bg-opacity-5 transition-colors border-black"
          >
            Edit
          </button>  
          }
          </motion.div>
        )}
      </AnimatePresence>
        </form>
      ) : (
        <div>user not found</div>
      )}
    </div>
  );
}
