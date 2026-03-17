import {
  BedDouble,
  CalendarDays,
  CreditCard,
  FileText,
  FlaskConical,
  Plus,
  Stethoscope,
  Users,
} from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import OccupancyCard from "../../components/dashboard/OccupancyCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import RecentAppointments from "../../components/dashboard/RecentAppointments";
import StatCard from "../../components/dashboard/StatCard";

const appointmentItems = [
  {
    id: "1",
    patient: "Ravi Kumar",
    doctor: "Dr. Ramesh",
    time: "09:30 AM",
    status: "Confirmed" as const,
  },
  {
    id: "2",
    patient: "Anjali Verma",
    doctor: "Dr. Priya",
    time: "10:00 AM",
    status: "Waiting" as const,
  },
  {
    id: "3",
    patient: "Suresh Patel",
    doctor: "Dr. Ramesh",
    time: "10:30 AM",
    status: "Completed" as const,
  },
  {
    id: "4",
    patient: "Neha Sharma",
    doctor: "Dr. Arjun",
    time: "11:15 AM",
    status: "Confirmed" as const,
  },
];

const AdminDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Hospital Overview"
        subtitle="Monitor operations, appointments, utilization, billing, and care workflow from one place."
        action={
          <button className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white hover:bg-slate-800">
            <Plus size={16} />
            Quick Add
          </button>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        <StatCard
          title="Total Patients"
          value="1,248"
          icon={<Users size={22} />}
          subtitle="Active registered records"
          trend="+12% this month"
        />
        <StatCard
          title="Appointments Today"
          value="86"
          icon={<CalendarDays size={22} />}
          subtitle="OPD + follow-up visits"
          trend="+8 new bookings"
        />
        <StatCard
          title="Monthly Revenue"
          value="₹2,48,500"
          icon={<CreditCard size={22} />}
          subtitle="Billing and collections"
          trend="+18% from last month"
        />
        <StatCard
          title="Doctors On Duty"
          value="24"
          icon={<Stethoscope size={22} />}
          subtitle="Across all departments"
          trend="3 on emergency shift"
        />
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentAppointments items={appointmentItems} />
        </div>

        <div className="space-y-5">
          <OccupancyCard
            title="ICU Beds"
            used={18}
            total={24}
            colorClass="bg-rose-500"
          />
          <OccupancyCard
            title="General Ward Beds"
            used={54}
            total={80}
            colorClass="bg-teal-500"
          />
          <OccupancyCard
            title="Private Rooms"
            used={22}
            total={30}
            colorClass="bg-cyan-500"
          />
        </div>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <QuickActionCard
          title="Register Patient"
          subtitle="Create new patient entry and profile"
          icon={<Users size={20} />}
        />
        <QuickActionCard
          title="Book Appointment"
          subtitle="Schedule a consultation quickly"
          icon={<CalendarDays size={20} />}
        />
        <QuickActionCard
          title="Create Bill"
          subtitle="Generate invoice and payment status"
          icon={<FileText size={20} />}
        />
        <QuickActionCard
          title="Lab Request"
          subtitle="Raise a diagnostic test order"
          icon={<FlaskConical size={20} />}
        />
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Department Snapshot
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Current live-looking hospital activity
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Cardiology", "14 Patients", "3 Doctors Active"],
              ["Orthopedics", "11 Patients", "2 Surgeries Today"],
              ["Emergency", "9 Cases", "Fast response queue"],
              ["Radiology", "17 Scans", "4 Reports pending"],
            ].map(([name, metric, note]) => (
              <div key={name} className="rounded-2xl bg-slate-50 p-4">
                <h4 className="font-semibold text-slate-800">{name}</h4>
                <p className="mt-2 text-sm text-slate-600">{metric}</p>
                <p className="mt-1 text-xs text-slate-400">{note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Latest operational updates
          </p>

          <div className="mt-5 space-y-4">
            {[
              "New patient registration completed for Meena Patel",
              "Lab result uploaded for Ravi Kumar",
              "Ward bed B-12 assigned to emergency admission",
              "Invoice generated for OPD consultation",
              "Prescription approved by Dr. Ramesh",
            ].map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-teal-500" />
                <p className="text-sm leading-6 text-slate-600">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-900 p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-300">Emergency Status</p>
                <h4 className="mt-1 text-xl font-semibold">Stable</h4>
              </div>
              <BedDouble size={22} className="text-teal-300" />
            </div>
            <p className="mt-3 text-sm text-slate-300">
              3 ambulances active, 2 trauma beds ready, all critical units
              staffed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
