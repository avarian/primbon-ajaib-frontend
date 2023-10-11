// import "./App.css";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Chatbox from "./components/Chatbox";
import Login from "./components/Login";
// import RequireAuth from "./components/RequireAuth";

import RequireAuth from "./components/RequireAuth";

function App() {
  // const [count, setCount] = useState(0);
  // const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  // useEffect(() => {
  //   const user = AuthService.getCurrentUser();

  //   if (user) {
  //     setCurrentUser(user);
  //   }

  //   eventBus.on("logout", logOut);

  //   return () => {
  //     eventBus.remove("logout", logOut);
  //   };
  // }, []);

  // const logOut = () => {
  //   AuthService.logout();
  //   setCurrentUser(undefined);
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/chatbox"
          element={
            <RequireAuth>
              <Chatbox />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/chatbox" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
