import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute() {
  const location = useLocation();
  const { name }: { name: string } = location.state ?? { name: "" };
  const { isSignedin } = useAuth();

  return isSignedin && name ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
