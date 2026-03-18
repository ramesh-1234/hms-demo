import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import type { Appointment } from "../../types/appointment";
import { appointmentService } from "../../services/appointmentService";

const QueuePage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = () => {
    setAppointments(appointmentService.getToday());
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const updateStatus = (
    id: string,
    status: "Checked In" | "In Consultation" | "Completed" | "Cancelled",
  ) => {
    appointmentService.updateStatus(id, status);
    loadAppointments();
  };

  return (
    <div>
      <PageHeader
        title="Today’s Queue"
        subtitle="Track patient flow from scheduled to consultation completion."
      />

      <div className="grid gap-5 xl:grid-cols-3">
        <QueueColumn
          title="Scheduled"
          items={appointments.filter((item) => item.status === "Scheduled")}
          actions={(id) => (
            <Button
              variant="secondary"
              onClick={() => updateStatus(id, "Checked In")}
            >
              Check In
            </Button>
          )}
        />

        <QueueColumn
          title="Checked In / Consultation"
          items={appointments.filter(
            (item) =>
              item.status === "Checked In" || item.status === "In Consultation",
          )}
          actions={(id) => (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => updateStatus(id, "In Consultation")}
              >
                Consult
              </Button>
              <Button onClick={() => updateStatus(id, "Completed")}>
                Complete
              </Button>
            </div>
          )}
        />

        <QueueColumn
          title="Completed / Cancelled"
          items={appointments.filter(
            (item) =>
              item.status === "Completed" || item.status === "Cancelled",
          )}
          actions={(id) => (
            <Button
              variant="secondary"
              onClick={() => updateStatus(id, "Cancelled")}
            >
              Cancel
            </Button>
          )}
        />
      </div>
    </div>
  );
};

const QueueColumn = ({
  title,
  items,
  actions,
}: {
  title: string;
  items: Appointment[];
  actions: (id: string) => React.ReactNode;
}) => {
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {items.length}
        </span>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No appointments
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-800">
                    {item.patientName}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.doctorName}
                  </p>
                </div>
                <StatusBadge text={item.status} />
              </div>

              <div className="mt-4 space-y-1 text-sm text-slate-600">
                <p>{item.time}</p>
                <p>{item.department}</p>
                <p>{item.reason}</p>
              </div>

              <div className="mt-4">{actions(item.id)}</div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};

export default QueuePage;
