import { createContext } from "react";
import { TUserCred } from "./hooks/useUser";

export const UserContext = createContext<{user:TUserCred | undefined, setUser: ((u: TUserCred | undefined) => void)}>({user: undefined, setUser: (u: TUserCred | undefined)=>{}});