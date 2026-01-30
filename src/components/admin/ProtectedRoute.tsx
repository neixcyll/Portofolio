import { Navigate, Outlet } from "react-router-dom";
import { hasAdminToken } from "@/lib/api";

const ProtectedRoute = () => {
  if (!hasAdminToken()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
