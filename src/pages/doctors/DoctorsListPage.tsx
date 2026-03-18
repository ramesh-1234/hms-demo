import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import PageHeader from "../../components/common/PageHeader";
import { doctorService } from "../../services/doctorService";
import type { Doctor } from "../../types/doctor";
import { getInitials } from "../../lib/utils";

const DoctorsListPage = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const loadDoctors = () => {
    setDoctors(doctorService.getAll());
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.fullName.toLowerCase().includes(search.toLowerCase()) ||
        doctor.doctorCode.toLowerCase().includes(search.toLowerCase()) ||
        doctor.department.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || doctor.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [doctors, search, status]);

  const handleDelete = (id: string) => {
    const ok = window.confirm("Delete this doctor?");
    if (!ok) return;
    doctorService.remove(id);
    loadDoctors();
  };

  return (
    <div>
      <PageHeader
        title="Doctors"
        subtitle="Manage doctor profiles, departments, and availability."
        action={
          <Link to="/doctors/add">
            <Button className="inline-flex items-center gap-2">
              <Plus size={16} />
              Add Doctor
            </Button>
          </Link>
        }
      />

      <Card>
        <div className="grid gap-4 md:grid-cols-[1fr_180px]">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <Search size={18} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, code, department, specialization"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3 font-medium">Doctor</th>
                <th className="pb-3 font-medium">Code</th>
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">Specialization</th>
                <th className="pb-3 font-medium">Experience</th>
                <th className="pb-3 font-medium">Fee</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr
                  key={doctor.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-sm font-semibold text-slate-600">
                        {doctor.photo ? (
                          <img
                            src={doctor.photo}
                            alt={doctor.fullName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          getInitials(doctor.fullName)
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {doctor.fullName}
                        </p>
                        <p className="text-sm text-slate-500">{doctor.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-slate-600">{doctor.doctorCode}</td>
                  <td className="py-4 text-slate-600">{doctor.department}</td>
                  <td className="py-4 text-slate-600">
                    {doctor.specialization}
                  </td>
                  <td className="py-4 text-slate-600">
                    {doctor.experienceYears} yrs
                  </td>
                  <td className="py-4 text-slate-600">
                    ₹{doctor.consultationFee}
                  </td>
                  <td className="py-4">
                    <Badge text={doctor.status} />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/doctors/${doctor.id}`)}
                        className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/doctors/edit/${doctor.id}`)}
                        className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(doctor.id)}
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

          {filteredDoctors.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500">
              No doctors found
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DoctorsListPage;
