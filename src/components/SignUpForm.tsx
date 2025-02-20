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

type TSignUpFields = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type OptionalProps<Type> = {
  [Property in keyof Type]?: Type[Property];
};

const profileSchema = yup
  .object({
    username: yup.string().required("Username is required"),
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 characters long"),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

export function SignUpForm() {
  const { setUser } = useContext(UserContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(profileSchema),
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: TSignUpFields) => {
    setLoading(true);
    const { confirm_password, ...req } = data;
    axios
      .post(`${baseurl}/auth/signup`, req)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("An error occured when signing up: ", err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-fit p-10 bg-white border-[1px] border-black border-opacity-20 flex flex-col rounded-lg"
    >
      <div className=" w-[500px] p-2 flex flex-col">
        <label className="form-label-style">First name</label>
        <input
          {...register("first_name")}
          className="form-input-style"
          placeholder="Your first name"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.first_name?.message}
        </p>
      </div>
      <div className=" w-[500px] p-2 flex flex-col">
        <label className="form-label-style">Last name</label>
        <input
          {...register("last_name")}
          className="form-input-style"
          placeholder="Your last name"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.last_name?.message}
        </p>
      </div>
      <div className=" w-[500px] p-2 flex flex-col">
        <label className="form-label-style">Username</label>
        <input
          {...register("username")}
          className="form-input-style"
          placeholder="Your username"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.username?.message}
        </p>
      </div>
      <div className=" w-[500px] p-2 flex flex-col">
        <label className="form-label-style">Email</label>
        <input
          {...register("email")}
          className="form-input-style"
          placeholder="Your email"
        />
        <p className="text-[#ff0000] font-semibold">{errors.email?.message}</p>
      </div>
      <div className=" w-[500px] p-2 flex flex-col">
        <label className="form-label-style">Password</label>
        <input
          {...register("password")}
          className="form-input-style"
          placeholder="Your password"
        />
        <p className="text-[#ff0000] font-semibold">
          {errors.password?.message}
        </p>
      </div>
      <div className=" w-[500px] p-2 flex flex-col">
        <label className="form-label-style">Confirm Password</label>
        <input
          {...register("confirm_password")}
          className="form-input-style"
          placeholder="Confirm your password"
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
