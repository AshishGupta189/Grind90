import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import Home from '../pages/Home.jsx'
import ProtectedRoute from "./ProtectedRoutes.jsx";
import PublicRoute from "./PublicRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      {/* Protected */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;

