import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import PatientForm from "../../components/forms/PatientForm";
import { patientService } from "../../services/patientService";
import type { Patient } from "../../types/patient";

const EditPatientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) return;
    setPatient(patientService.getById(id));
  }, [id]);

  if (!patient) {
    return <div className="text-sm text-slate-500">Patient not found.</div>;
  }

  const handleSubmit = (
    values: Omit<Patient, "id" | "patientCode" | "createdAt" | "updatedAt">,
  ) => {
    const updated = patientService.update(patient.id, values);
    navigate(`/patients/${updated?.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Edit Patient"
        subtitle="Update patient profile and medical details."
      />
      <PatientForm onSubmit={handleSubmit} initialValues={patient} />
    </div>
  );
};

export default EditPatientPage;
