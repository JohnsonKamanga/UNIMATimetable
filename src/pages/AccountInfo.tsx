import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { baseurl } from "../constants/url";
import Loader from "../components/Loader";
import { TUser, UpdateAccountInfo } from "../components/UpdateAccountInfoForm";
import { UpdatePasswordForm } from "../components/UpdatePasswordForm";

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
    <div className="flex flex-col flex-grow ">
      {user ? (
        <div className="w-full flex flex-row justify-evenly gap-x-10">
          <div>
            <h2 className="font-bold text-2xl p-2">Account Details</h2>
          <UpdateAccountInfo user={user}/>
        </div>
        <div>
        <h2 className="font-bold text-2xl p-2">Password</h2>
        <UpdatePasswordForm user={user}/>
        </div>
        </div>
      ) : (
        <div>user not found</div>
      )}
    </div>
  );
}
