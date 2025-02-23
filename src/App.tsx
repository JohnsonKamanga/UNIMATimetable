import { BrowserRouter, Route, Routes } from "react-router";
import Timetable from "./pages/Timetable";
import Courses from "./pages/Courses";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import TimeTables from "./pages/TimeTables";
import AccountInfo from "./pages/AccountInfo";
import Appearance from "./pages/Appearance";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import { UserContext } from "./user-context";
import { useUser } from "./hooks/useUser";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import DownloadPDF from "./pages/DownloadPDF";

function App() {
  const { user, setUser } = useUser();
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          >
            <Route index element={<Home />} />
            <Route path="timetable">
              <Route index element={<TimeTables />} />
              <Route path=":name" element={<Timetable />} />
            </Route>
            <Route path="courses" element={<Courses />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<Appearance />} />
              <Route path="account-info/:username" element={<AccountInfo />} />
            </Route>
          </Route>
          <Route path="export">
            <Route path="pdf/:name" element={<DownloadPDF />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
