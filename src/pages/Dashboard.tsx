import { FormEvent } from "react";
import SearchBar from "../components/SearcBar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";

export default function Dashboard() {
  const placeholders = [
    "Search your timetable",
    "Search your courses",
    "Search for settings",
  ];

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="w-full h-lvh flex flex-col overflow-y-scroll relative">
        <SearchBar
          placeholder={placeholders[0]}
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
