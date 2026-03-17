import {
  CalendarDays,
  ClipboardList,
  CreditCard,
  FileText,
} from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import StatCard from "../../components/dashboard/StatCard";

const PatientDashboard = () => {
  return (
    <div>
      <PageHeader
        title="Patient Dashboard"
        subtitle="Check appointments, prescriptions, reports, and payment details."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Upcoming Visits"
          value="2"
          icon={<CalendarDays size={22} />}
          subtitle="Scheduled consultations"
          trend="Next tomorrow"
        />
        <StatCard
          title="Prescriptions"
          value="4"
          icon={<ClipboardList size={22} />}
          subtitle="Active medicines"
          trend="1 recently updated"
        />
        <StatCard
          title="Reports"
          value="3"
          icon={<FileText size={22} />}
          subtitle="Available lab reports"
          trend="1 new upload"
        />
        <StatCard
          title="Bills"
          value="₹4,500"
          icon={<CreditCard size={22} />}
          subtitle="Outstanding amount"
          trend="Due in 3 days"
        />
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Next Appointment
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Your upcoming visit details
          </p>

          <div className="mt-5 rounded-3xl bg-gradient-to-r from-teal-600 to-cyan-600 p-5 text-white">
            <p className="text-sm text-teal-100">Doctor</p>
            <h4 className="mt-1 text-2xl font-bold">Dr. Ramesh</h4>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-teal-100">Date & Time</p>
                <p className="mt-1 font-medium">Tomorrow • 11:30 AM</p>
              </div>
              <div>
                <p className="text-sm text-teal-100">Department</p>
                <p className="mt-1 font-medium">Cardiology</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-slate-900">
            Recent Updates
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Latest changes in your profile
          </p>

          <div className="mt-5 space-y-3">
            {[
              "Prescription updated for blood pressure medication",
              "Blood test report uploaded to profile",
              "Follow-up appointment confirmed",
              "Consultation notes added by doctor",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-700"
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

export default PatientDashboard;
