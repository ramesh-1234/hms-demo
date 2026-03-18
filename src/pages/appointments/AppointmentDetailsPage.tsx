import { ArrowLeft, Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import { appointmentService } from "../../services/appointmentService";
import type { Appointment } from "../../types/appointment";

const AppointmentDetailsPage = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    if (!id) return;
    setAppointment(appointmentService.getById(id));
  }, [id]);

  if (!appointment) {
    return <div className="text-sm text-slate-500">Appointment not found.</div>;
  }

  return (
    <div>
      <PageHeader
        title="Appointment Details"
        subtitle="Complete booking summary and consultation status."
        action={
          <div className="flex items-center gap-3">
            <Link to="/appointments">
              <Button
                variant="secondary"
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>
            <Link to={`/appointments/edit/${appointment.id}`}>
              <Button className="inline-flex items-center gap-2">
                <Pencil size={16} />
                Edit
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Booking Summary
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Info
              label="Appointment Number"
              value={appointment.appointmentNumber}
            />
            <Info label="Patient Name" value={appointment.patientName} />
            <Info label="Doctor Name" value={appointment.doctorName} />
            <Info label="Department" value={appointment.department} />
            <Info label="Date" value={appointment.date} />
            <Info label="Time" value={appointment.time} />
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Status & Priority
          </h3>

          <div className="mt-5 flex flex-wrap gap-3">
            <StatusBadge text={appointment.status} />
            <StatusBadge text={appointment.priority} />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Info label="Reason" value={appointment.reason} />
            <Info label="Patient ID" value={appointment.patientId} />
            <Info label="Created At" value={appointment.createdAt} />
            <Info label="Updated At" value={appointment.updatedAt} />
          </div>
        </Card>

        <Card className="xl:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            {appointment.notes || "-"}
          </p>
        </Card>
      </div>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 font-medium text-slate-800">{value || "-"}</p>
    </div>
  );
};

export default AppointmentDetailsPage;
