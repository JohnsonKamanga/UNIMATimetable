import { useContext } from "react";
import { NavLink, useLocation } from "react-router";
import { UserContext } from "../user-context";

export default function SettingsNavBar() {
  const path = useLocation();
  const {user} = useContext(UserContext);
  return (
    <>
      <h1 className="font-semibold text-3xl mb-2">Settings</h1>
      <div className="flex flex-row gap-x-2 p-1">
        <NavLink
          to="/dashboard/settings"
          className={({ isActive }) =>
            (isActive && path.pathname === "/dashboard/settings")
              ? "p-1 text-lg hover:bg-black hover:bg-opacity-5 rounded-sm hover:shadow-md font-medium text-black"
              : "p-1 text-lg hover:bg-black hover:bg-opacity-5 rounded-sm hover:shadow-md font-medium text-opacity-35 text-black"
          }
        >
          <p>Preferances</p>
        </NavLink>
        <NavLink
          to={`/dashboard/settings/account-info/${user?.username}`}
          className={({ isActive }) =>
            isActive
              ? "p-1 text-lg hover:bg-black hover:bg-opacity-5 rounded-sm hover:shadow-md font-medium text-black"
              : "p-1 text-lg hover:bg-black hover:bg-opacity-5 rounded-sm hover:shadow-md font-medium text-opacity-35 text-black"
          }
        >
          <p>Account</p>
        </NavLink>
      </div>
    </>
  );
}
