import { useState } from "react";

export type TUser = {
  username: string;
  id: number;
  access_token: string;
};

export function useUser() {
  const getUser = (): TUser | undefined => {
    const u = localStorage.getItem("user");
    if (u) {
      return JSON.parse(u);
    }

    return undefined;
  };

  const [user, setUser] = useState<TUser | undefined>(getUser());

  const updateUser = (u: TUser | undefined) => {
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      localStorage.removeItem("user");
    }
    setUser(u);
  };

  return { user, setUser: updateUser };
}
