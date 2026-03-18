import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import PatientForm from "../../components/forms/PatientForm";
import { patientService } from "../../services/patientService";
import type { Patient } from "../../types/patient";

const AddPatientPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (
    values: Omit<Patient, "id" | "patientCode" | "createdAt" | "updatedAt">,
  ) => {
    const patient = patientService.create(values);
    navigate(`/patients/${patient.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Add Patient"
        subtitle="Create a new patient profile for consultation or admission."
      />
      <PatientForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddPatientPage;
