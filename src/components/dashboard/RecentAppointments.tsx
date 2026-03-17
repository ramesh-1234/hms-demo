import Card from "../common/Card";

interface AppointmentItem {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  status: "Confirmed" | "Waiting" | "Completed";
}

const badgeStyles: Record<AppointmentItem["status"], string> = {
  Confirmed: "bg-blue-50 text-blue-700",
  Waiting: "bg-amber-50 text-amber-700",
  Completed: "bg-emerald-50 text-emerald-700",
};

const RecentAppointments = ({ items }: { items: AppointmentItem[] }) => {
  return (
    <Card className="h-full">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Today’s Appointments
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Live-looking consultation queue
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left text-sm text-slate-500">
              <th className="pb-2 font-medium">Patient</th>
              <th className="pb-2 font-medium">Doctor</th>
              <th className="pb-2 font-medium">Time</th>
              <th className="pb-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="rounded-2xl bg-slate-50">
                <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-800">
                  {item.patient}
                </td>
                <td className="px-4 py-4 text-slate-600">{item.doctor}</td>
                <td className="px-4 py-4 text-slate-600">{item.time}</td>
                <td className="rounded-r-2xl px-4 py-4">
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
    </Card>
  );
};

export default RecentAppointments;
