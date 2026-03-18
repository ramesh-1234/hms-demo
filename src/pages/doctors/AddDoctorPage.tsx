import { useNavigate } from "react-router-dom";
import DoctorForm from "../../components/forms/DoctorForm";
import PageHeader from "../../components/common/PageHeader";
import { doctorService } from "../../services/doctorService";
import type { Doctor } from "../../types/doctor";

const AddDoctorPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (
    values: Omit<Doctor, "id" | "doctorCode" | "createdAt" | "updatedAt">,
  ) => {
    const doctor = doctorService.create(values);
    navigate(`/doctors/${doctor.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Add Doctor"
        subtitle="Create a doctor profile with specialization and availability."
      />
      <DoctorForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddDoctorPage;
