import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "../../components/forms/DoctorForm";
import PageHeader from "../../components/common/PageHeader";
import { doctorService } from "../../services/doctorService";
import type { Doctor } from "../../types/doctor";

const EditDoctorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (!id) return;
    setDoctor(doctorService.getById(id));
  }, [id]);

  if (!doctor) {
    return <div className="text-sm text-slate-500">Doctor not found.</div>;
  }

  const handleSubmit = (
    values: Omit<Doctor, "id" | "doctorCode" | "createdAt" | "updatedAt">,
  ) => {
    const updated = doctorService.update(doctor.id, values);
    navigate(`/doctors/${updated?.id}`);
  };

  return (
    <div>
      <PageHeader
        title="Edit Doctor"
        subtitle="Update profile, schedule, and consultation details."
      />
      <DoctorForm onSubmit={handleSubmit} initialValues={doctor} />
    </div>
  );
};

export default EditDoctorPage;
