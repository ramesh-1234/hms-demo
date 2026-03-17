import {
  CalendarDays,
  ClipboardList,
  FlaskConical,
  UserRound,
} from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import StatCard from "../../components/dashboard/StatCard";

const DoctorDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Doctor Dashboard"
        subtitle="Your appointments, prescriptions, and patient workflow for today."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Patients"
          value="12"
          icon={<UserRound size={22} />}
          subtitle="Consultation queue"
          trend="3 waiting"
        />
        <StatCard
          title="Appointments"
          value="18"
          icon={<CalendarDays size={22} />}
          subtitle="Scheduled today"
          trend="2 rescheduled"
        />
        <StatCard
          title="Prescriptions"
          value="9"
          icon={<ClipboardList size={22} />}
          subtitle="Created today"
          trend="4 pending"
        />
        <StatCard
          title="Lab Requests"
          value="6"
          icon={<FlaskConical size={22} />}
          subtitle="Diagnostic follow-ups"
          trend="2 urgent"
        />
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Today’s Schedule
          </h3>
          <p className="mt-1 text-sm text-slate-500">Upcoming consultations</p>

          <div className="mt-5 space-y-3">
            {[
              ["09:30 AM", "Ravi Kumar", "Follow-up"],
              ["10:15 AM", "Anjali Verma", "Cardiac Review"],
              ["11:00 AM", "Manoj Singh", "First Consultation"],
              ["12:30 PM", "Pooja Sharma", "ECG Discussion"],
            ].map(([time, patient, note]) => (
              <div
                key={time + patient}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="font-semibold text-slate-800">{patient}</p>
                  <p className="mt-1 text-sm text-slate-500">{note}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Pending Tasks
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Things requiring your attention
          </p>

          <div className="mt-5 space-y-3">
            {[
              "Approve 4 prescriptions",
              "Review 2 urgent lab reports",
              "Update notes for 3 consultations",
              "Check vitals summary for ward patient",
            ].map((task) => (
              <div
                key={task}
                className="rounded-2xl border border-slate-200 px-4 py-4 text-sm text-slate-700"
              >
                {task}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
