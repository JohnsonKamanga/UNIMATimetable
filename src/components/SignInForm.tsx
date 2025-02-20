import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { baseurl } from "../constants/url";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { UserContext } from "../user-context";
import { useNavigate } from "react-router";

const schema = yup
  .object({
    username: yup.string().required("Please provide your username"),
    password: yup.string().required("Please provide your password"),
  })
  .required();

export function SignInForm() {
  const { setUser } = useContext(UserContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: { username: string; password: string }) => {
    setLoading(true);
    axios
      .post(`${baseurl}/auth/signin`, data)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("An error occured during signin in: ", err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-fit p-10 bg-white border-[1px] shadow-2xl border-black border-opacity-20 flex flex-col rounded-lg"
    >
      <div className=" w-[450px] p-2 flex flex-col">
        <label className="form-label-style">Username</label>
        <input
          {...register("username")}
          className="form-input-style"
          placeholder="Enter your username"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.username?.message}
        </p>
      </div>
      <div className=" w-[450px] p-2 flex flex-col">
        <label className="form-label-style">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className="form-input-style"
          placeholder="Enter password"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.password?.message}
        </p>
      </div>
      <div className="p-2 gap-x-2 w-full flex items-center justify-start">
        <input
          type="checkbox"
          className="accent-[#FCBF49] hover:accent-[#F77F00] transition-colors"
          onChange={() => {
            setShowPassword(!showPassword);
          }}
        />
        <p className="font-semibold hover:cursor-default">Show password</p>
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
            className="flex flex-row items-center justify-center"
          >
            <button
              type="submit"
              className="form-button border-[1px] hover:bg-black hover:bg-opacity-5 transition-colors border-black"
            >
              Submit
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
