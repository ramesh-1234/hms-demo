import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import StatusBadge from "../../components/common/StatusBadge";
import type { Appointment } from "../../types/appointment";
import { appointmentService } from "../../services/appointmentService";

const AppointmentsListPage = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const loadAppointments = () => {
    setAppointments(appointmentService.getAll());
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => {
      const matchesSearch =
        item.patientName.toLowerCase().includes(search.toLowerCase()) ||
        item.appointmentNumber.toLowerCase().includes(search.toLowerCase()) ||
        item.doctorName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, status]);

  const handleDelete = (id: string) => {
    const ok = window.confirm("Delete this appointment?");
    if (!ok) return;
    appointmentService.remove(id);
    loadAppointments();
  };

  const handleQuickStatus = (
    id: string,
    status: "Checked In" | "In Consultation" | "Completed",
  ) => {
    appointmentService.updateStatus(id, status);
    loadAppointments();
  };

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle="Manage bookings, patient visits, and consultation status."
        action={
          <div className="flex items-center gap-3">
            <Link to="/appointments/queue">
              <Button variant="secondary">Queue View</Button>
            </Link>
            <Link to="/appointments/add">
              <Button className="inline-flex items-center gap-2">
                <Plus size={16} />
                Add Appointment
              </Button>
            </Link>
          </div>
        }
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient, doctor, or appointment number"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Checked In">Checked In</option>
            <option value="In Consultation">In Consultation</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3 font-medium">Number</th>
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Doctor</th>
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Priority</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="py-4 font-medium text-slate-800">
                    {item.appointmentNumber}
                  </td>
                  <td className="py-4 text-slate-600">{item.patientName}</td>
                  <td className="py-4 text-slate-600">{item.doctorName}</td>
                  <td className="py-4 text-slate-600">{item.department}</td>
                  <td className="py-4 text-slate-600">{item.date}</td>
                  <td className="py-4 text-slate-600">{item.time}</td>
                  <td className="py-4">
                    <StatusBadge text={item.priority} />
                  </td>
                  <td className="py-4">
                    <StatusBadge text={item.status} />
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleQuickStatus(item.id, "Checked In")}
                        className="rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        Check In
                      </button>
                      <button
                        onClick={() =>
                          handleQuickStatus(item.id, "In Consultation")
                        }
                        className="rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        Consult
                      </button>
                      <button
                        onClick={() => handleQuickStatus(item.id, "Completed")}
                        className="rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => navigate(`/appointments/${item.id}`)}
                        className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/appointments/edit/${item.id}`)
                        }
                        className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-xl border border-red-200 p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAppointments.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500">
              No appointments found
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AppointmentsListPage;
