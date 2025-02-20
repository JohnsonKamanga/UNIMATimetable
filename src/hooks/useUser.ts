import { useState } from "react";

export type TUserCred = {
  username: string;
  id: number;
  access_token: string;
};

export function useUser() {
  const getUser = (): TUserCred | undefined => {
    const u = localStorage.getItem("user");
    if (u) {
      return JSON.parse(u);
    }

    return undefined;
  };

  const [user, setUser] = useState<TUserCred | undefined>(getUser());

  const updateUser = (u: TUserCred | undefined) => {
    if (u) {
      localStorage.setItem("user", JSON.stringify(u));
    } else {
      localStorage.removeItem("user");
    }
    setUser(u);
  };

  return { user, setUser: updateUser };
}
