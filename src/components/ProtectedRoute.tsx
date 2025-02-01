import { useContext, useEffect } from "react";
import { UserContext } from "../user-context";
import { useNavigate } from "react-router";

export default function ProtectedRoute({
  element,
}: {
  element: React.ReactNode;
}) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, []);

  return user && element;
}
