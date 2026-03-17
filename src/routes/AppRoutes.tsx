import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import DoctorDashboard from "../pages/dashboard/DoctorDashboard";
import ReceptionDashboard from "../pages/dashboard/RecentAppointments";
import PatientDashboard from "../pages/dashboard/PatientDashboard";
import NotFound from "../pages/shared/NotFound";
import { useAuth } from "../hooks/useAuth";

const DashboardResolver = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "doctor") return <DoctorDashboard />;
  if (user.role === "reception") return <ReceptionDashboard />;
  if (user.role === "patient") return <PatientDashboard />;

  return <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardResolver />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/patients"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div className="text-xl font-semibold">
                Patients page coming next
              </div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div className="text-xl font-semibold">
                Doctors page coming next
              </div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div className="text-xl font-semibold">
                Appointments page coming next
              </div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/billing"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div className="text-xl font-semibold">
                Billing page coming next
              </div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lab"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div className="text-xl font-semibold">Lab page coming next</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/pharmacy"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div className="text-xl font-semibold">
                Pharmacy page coming next
              </div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div className="text-xl font-semibold">
                Settings page coming next
              </div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
