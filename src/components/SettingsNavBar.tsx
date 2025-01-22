import { NavLink } from "react-router";

export default function SettingsNavBar() {
  return (
    <>
    <h1 className="font-semibold text-3xl">Settings</h1>
    <div className="flex flex-row">
      <NavLink
        to="/settings/account-info/johnson_kamanga"
        className={({ isActive }) =>
          isActive
            ? "p-2 text-xl hover:bg-black hover:bg-opacity-5 rounded-md hover:shadow-md font-normal text-black"
            : "p-2 text-xl hover:bg-black hover:bg-opacity-5 rounded-md hover:shadow-md font-normal text-opacity-35 text-black"
        }
      >
        <p>Account Info</p>
      </NavLink>
      <NavLink
        to="/settings/appearance"
        className={({ isActive }) =>
          isActive
            ? "p-2 text-xl hover:bg-black hover:bg-opacity-5 rounded-md hover:shadow-md font-normal text-black"
            : "p-2 text-xl hover:bg-black hover:bg-opacity-5 rounded-md hover:shadow-md font-normal text-opacity-35 text-black"
        }
      >
        <p>Appearance</p>
      </NavLink>
    </div>
    </>
  );
}
