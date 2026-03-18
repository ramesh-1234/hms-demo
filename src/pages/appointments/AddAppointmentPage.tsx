import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import AppointmentForm from "../../components/forms/AppointmentForm";
import { appointmentService } from "../../services/appointmentService";
import { patientService } from "../../services/patientService";
import type { Appointment } from "../../types/appointment";

const AddAppointmentPage = () => {
  const navigate = useNavigate();
  const patients = useMemo(() => patientService.getAll(), []);

  const handleSubmit = (
    values: Omit<
      Appointment,
      "id" | "appointmentNumber" | "createdAt" | "updatedAt"
    >,
  ) => {
    const appointment = appointmentService.create(values);
    navigate(`/appointments/${appointment.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Add Appointment"
        subtitle="Book a new appointment for an existing patient."
      />
      <AppointmentForm patients={patients} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddAppointmentPage;
