import { Outlet } from "react-router";
import SettingsNavBar from "../components/SettingsNavBar";

export default function Settings() {
  return (
    <div className="w-full p-8 min-h-lvh bg-[#F8F7F7] rounded-md">
      <SettingsNavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
