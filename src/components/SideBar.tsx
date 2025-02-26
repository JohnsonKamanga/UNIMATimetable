import { BookOpen, Calendar1Icon, Home, LogOut, Settings } from "lucide-react";
import UserImage from "../assets/user-picture.png";
import { NavLink, useLocation } from "react-router";
import { useContext } from "react";
import { UserContext } from "../user-context";

export default function SideBar() {
  const {user} = useContext(UserContext);
  const path = useLocation();
  return (
    <div className="h-lvh w-[271px] flex flex-col justify-between bg-[#003049]">
      <div>
        {/*profile picture and username*/}
        <div className="p-1 mb-2">
          <div className="flex items-center justify-center p-2">
            <img
              src={UserImage}
              alt="avatar"
              className="h-[131px] aspect-square rounded-full"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <b className="font-bold text-2xl text-white">{user?.username}</b>
          </div>
        </div>
        {/*Sidebar options */}
        <div className="gap-y-3 p-2">
          <div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive && path.pathname === "/dashboard"
                  ? "flex flex-row items-center gap-x-1 bg-white bg-opacity-10 rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all"
                  : "flex flex-row items-center gap-x-1 rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all"
              }
            >
              <Home color="white" />
              <p className="text-white font-semibold text-xl">Home</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/dashboard/timetable"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row items-center gap-x-1 bg-white bg-opacity-10 rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all"
                  : "flex flex-row items-center gap-x-1 rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all"
              }
            >
              <Calendar1Icon color="white" />
              <p className="text-white font-semibold text-xl">Timetables</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/dashboard/courses"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row items-center gap-x-1 bg-white bg-opacity-10 rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all"
                  : "flex flex-row items-center gap-x-1 rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all"
              }
            >
              <BookOpen color="white" />
              <p className="text-white font-semibold text-xl">Courses</p>
            </NavLink>
          </div>
          <div>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row items-center gap-x-1 bg-white bg-opacity-10 rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all"
                  : "flex flex-row items-center gap-x-1 rounded-xl p-3 hover:bg-white hover:bg-opacity-20 transition-all"
              }
            >
              <Settings color="white" />
              <p className="text-white font-semibold text-xl">Settings</p>
            </NavLink>
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
