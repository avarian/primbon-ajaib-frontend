import { Navigate, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

import * as AuthService from "../services/auth.service";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  // const { auth } = useAuth();
  const location = useLocation();

  // const [count, setCount] = useState(0);
  // const [currentUser, setCurrentUser] = useState();
  const user = AuthService.getCurrentUser();
  // useEffect(() => {
  //   // console.log(user);

  //   if (user) {
  //     const valUser = user;
  //     setCurrentUser(valUser);
  //   }

  //   // eventBus.on("logout", logOut);

  //   // return () => {
  //   //   eventBus.remove("logout", logOut);
  //   // };
  // }, []);

  // const logOut = () => {
  //   AuthService.logout();
  //   setCurrentUser(undefined);
  // };

  // if (currentUser?.token != "") {
  //   // user is not authenticated
  //   return <Navigate to="/login" />;
  // }
  // return children;
  // console.log(currentUser?.token);

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
