import { CalendarDays, Clock3, UserPlus, Users } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import StatCard from "../../components/dashboard/StatCard";

const ReceptionDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Reception Dashboard"
        subtitle="Manage registrations, check-ins, appointments, and token flow."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Walk-ins"
          value="23"
          icon={<Users size={22} />}
          subtitle="Patients arrived today"
          trend="+7 in last hour"
        />
        <StatCard
          title="Registrations"
          value="11"
          icon={<UserPlus size={22} />}
          subtitle="New patients today"
          trend="+3 since morning"
        />
        <StatCard
          title="Appointments"
          value="38"
          icon={<CalendarDays size={22} />}
          subtitle="Today's bookings"
          trend="5 pending check-in"
        />
        <StatCard
          title="Wait Time"
          value="18 min"
          icon={<Clock3 size={22} />}
          subtitle="Average current waiting"
          trend="-4 min better"
        />
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">Token Queue</h3>
          <p className="mt-1 text-sm text-slate-500">
            Current front desk movement
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["T-101", "Ravi Kumar", "Dr. Ramesh", "Waiting"],
              ["T-102", "Meena Patel", "Dr. Priya", "Checked In"],
              ["T-103", "Aman Singh", "Dr. Arjun", "At Counter"],
              ["T-104", "Neha Sharma", "Dr. Ramesh", "Waiting"],
            ].map(([token, patient, doctor, status]) => (
              <div
                key={token as string}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {token} • {patient}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{doctor}</p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Front Desk Notes
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Quick view of daily operations
          </p>

          <div className="mt-5 space-y-3">
            {[
              "5 appointments are yet to check in",
              "2 new patients need registration approval",
              "Billing counter is active for OPD payments",
              "One doctor slot became available at 4:00 PM",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
