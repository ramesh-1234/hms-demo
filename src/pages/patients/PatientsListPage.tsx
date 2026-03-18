import { Eye, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { useEffect, useMemo, useState } from "react";
import { patientService } from "../../services/patientService";
import type { Patient } from "../../types/patient";
import { formatDate, getInitials } from "../../lib/utils";

const PatientsListPage = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const loadPatients = () => {
    setPatients(patientService.getAll());
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesSearch =
        patient.fullName.toLowerCase().includes(search.toLowerCase()) ||
        patient.patientCode.toLowerCase().includes(search.toLowerCase()) ||
        patient.phone.includes(search);

      const matchesStatus = status === "All" || patient.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [patients, search, status]);

  const handleDelete = (id: string) => {
    const ok = window.confirm("Delete this patient?");
    if (!ok) return;
    patientService.remove(id);
    loadPatients();
  };

  return (
    <div>
      <PageHeader
        title="Patients"
        subtitle="Manage patient records, profiles, and admission status."
        action={
          <Link to="/patients/add">
            <Button className="inline-flex items-center gap-2">
              <Plus size={16} />
              Add Patient
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
              placeholder="Search by name, code, or phone"
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
            <option value="Admitted">Admitted</option>
            <option value="Discharged">Discharged</option>
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[980px]">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-500">
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Code</th>
                <th className="pb-3 font-medium">Phone</th>
                <th className="pb-3 font-medium">Disease</th>
                <th className="pb-3 font-medium">Doctor</th>
                <th className="pb-3 font-medium">Created</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 text-sm font-semibold text-slate-600">
                        {patient.photo ? (
                          <img
                            src={patient.photo}
                            alt={patient.fullName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          getInitials(patient.fullName)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          {patient.fullName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {patient.age} yrs • {patient.gender}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-slate-600">{patient.patientCode}</td>
                  <td className="py-4 text-slate-600">{patient.phone}</td>
                  <td className="py-4 text-slate-600">{patient.disease}</td>
                  <td className="py-4 text-slate-600">
                    {patient.doctorAssigned}
                  </td>
                  <td className="py-4 text-slate-600">
                    {formatDate(patient.createdAt)}
                  </td>
                  <td className="py-4">
                    <Badge text={patient.status} />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/patients/${patient.id}`)}
                        className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/patients/edit/${patient.id}`)}
                        className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
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

          {filteredPatients.length === 0 && (
            <div className="py-12 text-center text-sm text-slate-500">
              No patients found
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PatientsListPage;
