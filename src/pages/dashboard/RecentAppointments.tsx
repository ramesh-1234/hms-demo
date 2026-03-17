import Card from "../../components/common/Card";

export interface AppointmentItem {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  status: "Confirmed" | "Waiting" | "Completed";
}

interface RecentAppointmentsProps {
  items?: AppointmentItem[];
}

const badgeStyles: Record<AppointmentItem["status"], string> = {
  Confirmed: "bg-blue-50 text-blue-700",
  Waiting: "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

const RecentAppointments = ({ items = [] }: RecentAppointmentsProps) => {
  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Today’s Appointments
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Scheduled consultations and current status
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
          No appointments available
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Doctor</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="py-4 font-medium text-slate-800">
                    {item.patient}
                  </td>
                  <td className="py-4 text-slate-600">{item.doctor}</td>
                  <td className="py-4 text-slate-600">{item.time}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

export default RecentAppointments;
