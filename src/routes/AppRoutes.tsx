import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import DoctorDashboard from "../pages/dashboard/DoctorDashboard";
import ReceptionDashboard from "../pages/dashboard/ReceptionDashboard";
import PatientDashboard from "../pages/dashboard/PatientDashboard";
import NotFound from "../pages/shared/NotFound";
import { useAuth } from "../hooks/useAuth";
import PatientsListPage from "../pages/patients/PatientsListPage";
import AddPatientPage from "../pages/patients/AddPatientPage";
import EditPatientPage from "../pages/patients/EditPatientPage";
import PatientDetailsPage from "../pages/patients/PatientDetailsPage";
import AppointmentsListPage from "../pages/appointments/AppointmentsListPage";
import AddAppointmentPage from "../pages/appointments/AddAppointmentPage";
import EditAppointmentPage from "../pages/appointments/EditAppointmentPage";
import AppointmentDetailsPage from "../pages/appointments/AppointmentDetailsPage";
import QueuePage from "../pages/appointments/QueuePage";
import DoctorsListPage from "../pages/doctors/DoctorsListPage";
import AddDoctorPage from "../pages/doctors/AddDoctorPage";
import EditDoctorPage from "../pages/doctors/EditDoctorPage";
import DoctorDetailsPage from "../pages/doctors/DoctorDetailsPage";

const DashboardResolver = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const map = {
    admin: <AdminDashboard />,
    doctor: <DoctorDashboard />,
    reception: <ReceptionDashboard />,
    patient: <PatientDashboard />,
  };

  return map[user.role] || <AdminDashboard />;
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
              <PatientsListPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/add"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AddPatientPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/edit/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <EditPatientPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <PatientDetailsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DoctorsListPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/add"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AddDoctorPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/edit/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <EditDoctorPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DoctorDetailsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AppointmentsListPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/add"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AddAppointmentPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/edit/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <EditAppointmentPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/queue"
        element={
          <ProtectedRoute>
            <AppLayout>
              <QueuePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/appointments/:id"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AppointmentDetailsPage />
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
