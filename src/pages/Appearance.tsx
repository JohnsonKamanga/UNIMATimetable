import { Moon, Sun, SunMoon } from "lucide-react";

export default function Appearance() {
  return (
    <div>
      <section>
        <h2 className="font-semibold">Appearance</h2>
        <div className="flex flex-row gap-x-2 p-1">
          <p className="p-1">Theme</p>
          <select className="bg-green-400 p-1 font-light outline-none">
            <option value="System">
              <div className="flex flex-row gap-x-2">
                <p className="font-light">System</p>
                <SunMoon color="black" />
              </div>
            </option>
            <option value="Light">
              <div className="flex flex-row gap-x-2">
                <p>Light</p>
                <Sun color="black" />
              </div>
            </option>
            <option value="Dark">
              <div className="flex flex-row gap-x-2">
                <p>Dark</p>
                <Moon color="black" />
              </div>
            </option>
          </select>
        </div>
      </section>
      <section>
        <h2 className="font-semibold">Sync</h2>
        <div>sync on google calender</div>
      </section>
    </div>
  );
}
