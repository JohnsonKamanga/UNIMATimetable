import { BrowserRouter, Route, Routes } from "react-router";
import SideBar from "./components/SideBar";
import Timetable from "./pages/Timetable";
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";
import SearchBar from "./components/SearcBar";
import { FormEvent } from "react";

function App() {
  const placeholders = [
    "Search your timetable",
    "Search your courses",
    "Search for settings",
  ];
  return (
    <BrowserRouter>
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div className="w-full h-lvh overflow-y-scroll relative">
          <SearchBar
            placeholder={placeholders[0]}
            handleSearch={(event: FormEvent<HTMLElement>, query: string) => {
              event.preventDefault();
              console.log("You searched", query);
            }}
          />
          <Routes>
            <Route index element={<Timetable />} />
            <Route path="courses" element={<Courses />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
