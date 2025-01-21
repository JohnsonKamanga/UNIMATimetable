import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { baseurl } from "../constants/url";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export type TUser = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export type OptionalProps<Type> = {
  [Property in keyof Type]?: Type[Property];
};

const profileSchema = yup
  .object({
    username: yup.string(),
    first_name: yup.string(),
    last_name: yup.string(),
    email: yup.string().email("Email must be valid"),
  })
  .required();

export function UpdateAccountInfo({ user }: { user: TUser }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });
  const [updateInfo, setUpdateInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitAccountInfo = async (data: OptionalProps<TUser>) => {
    setLoading(true);
    try {
      const res = (
        await axios.put(`${baseurl}/user/account-info`, {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmitAccountInfo)}
      className="w-fit p-10 bg-white border-[1px] border-black border-opacity-20 flex flex-col rounded-lg"
    >
      <div className=" w-[600px] p-2 flex flex-col">
        <label className="form-label-style">First name</label>
        <input
          disabled={!updateInfo}
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
          disabled={!updateInfo}
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
          disabled={!updateInfo}
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
          disabled={!updateInfo}
          {...register("email")}
          className="form-input-style"
          placeholder={user.email}
        />
        <p className="text-[#ff0000] font-semibold">{errors.email?.message}</p>
      </div>
      <AnimatePresence>
        {loading ? (
          <div className="w-full flex flex-row items-center justify-center">
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
          </div>
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
            </button>
            {updateInfo ? (
              <button
                type="submit"
                className="form-button border-[1px] hover:bg-black hover:bg-opacity-5 transition-colors border-black"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setUpdateInfo(true);
                }}
                className="form-button border-[1px] hover:bg-black hover:bg-opacity-5 transition-colors border-black"
              >
                Edit
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
