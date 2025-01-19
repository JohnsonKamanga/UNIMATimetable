import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseurl } from "../constants/url";
import Loader from "../components/Loader";

type TUser = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
};

export default function AccountInfo() {
  const { username } = useParams();
  const [user, setUser] = useState<TUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseurl}/user/${username}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("An error occured when fetching user info: ", err);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-grow">
        <div className="h-full w-full flex items-center justify-center bg-black bg-opacity-25">
          <Loader message="Fetching User Info" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <div>
          <div className="flex flex-row gap-x-2">
            <b>First Name:</b> <p>{user?.first_name}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <b>Last Name: </b>
            <p> {user?.last_name}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <b>username: </b>
            <p> {user?.username}</p>
          </div>
          <div className="flex flex-row gap-x-2">
            <b>Email: </b>
            <p> {user?.email}</p>
          </div>
        </div>
      ) : (
        <div>user not found</div>
      )}
    </div>
  );
}
