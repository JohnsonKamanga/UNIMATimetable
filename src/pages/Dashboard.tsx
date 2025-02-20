import { FormEvent } from "react";
import SearchBar from "../components/SearcBar";
import SideBar from "../components/SideBar";
import { Outlet, useLocation } from "react-router";

export default function Dashboard() {
  const location = useLocation().pathname;
  const placeholder =
    location === "/dashboard" || location.match(/\/dashboard\/timetable\/./)
      ? "Search your timetable"
      : location === "/dashboard/timetable"
      ? "Search your timetables"
      : location === "/dashboard/courses"
      ? "Search your courses"
      : "Search your settings";

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="w-full h-lvh flex flex-col overflow-y-scroll relative">
        <SearchBar
          placeholder={placeholder}
          handleSearch={(event: FormEvent<HTMLElement>, query: string) => {
            event.preventDefault();
            console.log("You searched", query);
          }}
        />
        <Outlet />
      </div>
    </div>
  );
}
