import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { baseurl } from "../constants/url";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { TUser } from "./UpdateAccountInfoForm";

const passwordSchema = yup
  .object({
    original_password: yup
      .string()
      .required("Please provide your original password"),
    new_password: yup.string().required("Please enter new password"),
    confirm_password: yup
      .string()
      .required("Please enter confirm password")
      .oneOf([yup.ref("new_password")], "Passwords must match"),
  })
  .required();

export function UpdatePasswordForm({ user }: { user: TUser }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const [updateInfo, setUpdateInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: {
    original_password: string;
    new_password: string;
    confirm_password: string;
  }) => {
    setLoading(true);
    try {
      const res = (
        await axios.put(`${baseurl}/user/password`, {
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
      onSubmit={handleSubmit(onSubmit)}
      className="w-fit p-10 bg-white border-[1px] border-black border-opacity-20 flex flex-col rounded-lg"
    >
      <div className=" w-[450px] p-2 flex flex-col">
        <label className="form-label-style">Current Password</label>
        <input
          disabled={!updateInfo}
          {...register("original_password")}
          className="form-input-style"
          placeholder="Enter current password"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.original_password?.message}
        </p>
      </div>
      <div className=" w-[450px] p-2 flex flex-col">
        <label className="form-label-style">New Password</label>
        <input
          disabled={!updateInfo}
          {...register("new_password")}
          className="form-input-style"
          placeholder="Enter new password"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.new_password?.message}
        </p>
      </div>
      <div className=" w-[450px] p-2 flex flex-col">
        <label className="form-label-style">Confirm Password</label>
        <input
          disabled={!updateInfo}
          {...register("confirm_password")}
          className="form-input-style"
          placeholder="Re-enter new password"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.confirm_password?.message}
        </p>
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
