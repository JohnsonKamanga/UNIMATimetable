import { SignUpForm } from "../components/SignUpForm";

export default function SignUp() {
  return (
    <div className="card-bg-color-1 min-h-svh flex flex-row justify-evenly p-5">
    <div className="flex flex-col items-center">
      <SignUpForm />
    </div>
      <div className="flex flex-row justify-center">
        <h1 className="text-5xl w-[690px] text-center font-bold">
          Sign up and start staying up to date with your classes
        </h1>
      </div>
    </div>
  );
}
