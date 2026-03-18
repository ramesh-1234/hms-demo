import { ArrowLeft, Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { patientService } from "../../services/patientService";
import type { Patient } from "../../types/patient";
import { formatDate, getInitials } from "../../lib/utils";

const PatientDetailsPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) return;
    setPatient(patientService.getById(id));
  }, [id]);

  if (!patient) {
    return <div className="text-sm text-slate-500">Patient not found.</div>;
  }

  return (
    <div>
      <PageHeader
        title="Patient Details"
        subtitle="Complete patient profile, status, and emergency information."
        action={
          <div className="flex items-center gap-3">
            <Link to="/patients">
              <Button
                variant="secondary"
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>
            <Link to={`/patients/edit/${patient.id}`}>
              <Button className="inline-flex items-center gap-2">
                <Pencil size={16} />
                Edit
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[340px_1fr]">
        <Card>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-slate-100 text-3xl font-bold text-slate-600">
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

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              {patient.fullName}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{patient.patientCode}</p>

            <div className="mt-3">
              <Badge text={patient.status} />
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Age</span>
              <span className="font-medium text-slate-800">{patient.age}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Gender</span>
              <span className="font-medium text-slate-800">
                {patient.gender}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Blood Group</span>
              <span className="font-medium text-slate-800">
                {patient.bloodGroup}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Phone</span>
              <span className="font-medium text-slate-800">
                {patient.phone}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-slate-800">
                {patient.email || "-"}
              </span>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">
              Medical Summary
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Info label="Disease / Reason" value={patient.disease} />
              <Info label="Doctor Assigned" value={patient.doctorAssigned} />
              <Info
                label="Date of Birth"
                value={formatDate(patient.dateOfBirth)}
              />
              <Info
                label="Admitted On"
                value={formatDate(patient.admittedOn)}
              />
              <Info label="Created On" value={formatDate(patient.createdAt)} />
              <Info
                label="Last Updated"
                value={formatDate(patient.updatedAt)}
              />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Address</h3>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {patient.address || "-"}
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900">
              Emergency Contact
            </h3>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Info label="Name" value={patient.emergencyContact.name} />
              <Info label="Phone" value={patient.emergencyContact.phone} />
              <Info
                label="Relation"
                value={patient.emergencyContact.relation}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 font-medium text-slate-800">{value || "-"}</p>
    </div>
  );
};

export default PatientDetailsPage;
