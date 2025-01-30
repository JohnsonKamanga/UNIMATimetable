import { createContext } from "react";
import { TUser } from "./hooks/useUser";

export const UserContext = createContext<{user:TUser | undefined, setUser: ((u: TUser | undefined) => void)} | undefined>(undefined);