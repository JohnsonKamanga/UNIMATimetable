import { NavLink, useLocation } from "react-router";

export default function SettingsNavBar() {
  const path = useLocation();
  return (
    <>
      <h1 className="font-semibold text-3xl mb-2">Settings</h1>
      <div className="flex flex-row gap-x-2 p-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            (isActive && path.pathname === "/settings")
              ? "p-1 text-lg hover:bg-black hover:bg-opacity-5 rounded-sm hover:shadow-md font-medium text-black"
              : "p-1 text-lg hover:bg-black hover:bg-opacity-5 rounded-sm hover:shadow-md font-medium text-opacity-35 text-black"
          }
        >
          <p>Preferances</p>
        </NavLink>
        <NavLink
          to="/settings/account-info/johnson_kamanga"
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
