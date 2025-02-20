import { LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router";

export default function Landing(){

    return(
        <div>
            <div className="flex flex-row justify-end w-full bg-red-700 p-2">
                <NavLink className="flex flex-row gap-x-2" to="/dashboard">
                <p className="text-white">Dashboard</p>
                <LayoutDashboard color="white"/>
                </NavLink>
            </div>
            <h1>Landing page</h1>
        </div>
    )
}