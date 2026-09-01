import { useContext } from "react";

import {
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({
  children,
}) => {
  const {
    user,
    loading,
  } = useContext(AuthContext);

  const location =
    useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 font-semibold text-gray-600">
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname +
            location.search,
        }}
      />
    );
  }

  return children;
};

export default PrivateRoute;