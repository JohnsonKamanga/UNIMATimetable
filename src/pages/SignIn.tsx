import { SignInForm } from "../components/SignInForm";

export default function SignIn() {
  return (
    <div className="card-bg-color-1 h-svh flex flex-col justify-evenly p-5">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-5xl w-[690px] text-center font-bold">
          Sign in and get back to staying up to date with your classes
        </h1>
      </div>
      <div className="flex flex-col items-center">
        <SignInForm />
      </div>
    </div>
  );
}
