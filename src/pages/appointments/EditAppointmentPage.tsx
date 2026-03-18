import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import AppointmentForm from "../../components/forms/AppointmentForm";
import { appointmentService } from "../../services/appointmentService";
import { patientService } from "../../services/patientService";
import type { Appointment } from "../../types/appointment";

const EditAppointmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const patients = useMemo(() => patientService.getAll(), []);

  useEffect(() => {
    if (!id) return;
    setAppointment(appointmentService.getById(id));
  }, [id]);

  if (!appointment) {
    return <div className="text-sm text-slate-500">Appointment not found.</div>;
  }

  const handleSubmit = (
    values: Omit<
      Appointment,
      "id" | "appointmentNumber" | "createdAt" | "updatedAt"
    >,
  ) => {
    const updated = appointmentService.update(appointment.id, values);
    navigate(`/appointments/${updated?.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Edit Appointment"
        subtitle="Update booking details and visit status."
      />
      <AppointmentForm
        patients={patients}
        onSubmit={handleSubmit}
        initialValues={appointment}
      />
    </div>
  );
};

export default EditAppointmentPage;
