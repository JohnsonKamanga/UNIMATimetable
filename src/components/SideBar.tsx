import { Book, Calendar1Icon, LogOut, Settings } from "lucide-react";
import Image from "../assets/image.jpg";

export default function SideBar() {
  return (
    <div className="min-h-screen h-full w-[271px] flex flex-col justify-between bg-[#003049]">
      <div>
        {/*profile picture and username*/}
        <div className="p-1 mb-2">
          <div className="flex items-center justify-center p-2">
            <img
              src={Image}
              alt="avatar"
              className="h-[131px] aspect-square rounded-full"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <b className="font-bold text-2xl text-white">Full Name</b>
          </div>
        </div>
        {/*Sidebar options */}
        <div className="gap-y-3 p-2">
          <div>
            <div className="flex flex-row items-center gap-x-1 bg-white bg-opacity-10 rounded-xl p-3">
              <Calendar1Icon color="white" />
              <p className="text-white font-semibold text-xl">Timetables</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center gap-x-1 rounded-xl p-3">
              <Book color="white" />
              <p className="text-white font-semibold text-xl">Courses</p>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center gap-x-1 rounded-xl p-3">
              <Settings color="white" />
              <p className="text-white font-semibold text-xl">Settings</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="flex flex-row items-center gap-x-1 rounded-xl p-3 mb-3">
            <LogOut color="white" />
            <p className="text-white font-semibold text-xl">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
