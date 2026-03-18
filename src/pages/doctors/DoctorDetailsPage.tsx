import { ArrowLeft, Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import PageHeader from "../../components/common/PageHeader";
import { doctorService } from "../../services/doctorService";
import { appointmentService } from "../../services/appointmentService";
import type { Doctor } from "../../types/doctor";
import { getInitials } from "../../lib/utils";

const DoctorDetailsPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (!id) return;
    setDoctor(doctorService.getById(id));
  }, [id]);

  const doctorAppointments = useMemo(() => {
    if (!doctor) return [];
    return appointmentService
      .getAll()
      .filter((item) => item.doctorName === doctor.fullName)
      .slice(0, 5);
  }, [doctor]);

  if (!doctor) {
    return <div className="text-sm text-slate-500">Doctor not found.</div>;
  }

  return (
    <div>
      <PageHeader
        title="Doctor Details"
        subtitle="View doctor profile, availability, and recent appointments."
        action={
          <div className="flex items-center gap-3">
            <Link to="/doctors">
              <Button
                variant="secondary"
                className="inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>
            <Link to={`/doctors/edit/${doctor.id}`}>
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

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              {doctor.fullName}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{doctor.doctorCode}</p>
            <p className="mt-2 text-sm text-slate-600">
              {doctor.specialization}
            </p>

            <div className="mt-3">
              <Badge text={doctor.status} />
            </div>
          </div>

          <div className="mt-6 space-y-4 border-t border-slate-100 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Department</span>
              <span className="font-medium text-slate-800">
                {doctor.department}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Phone</span>
              <span className="font-medium text-slate-800">{doctor.phone}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-slate-800">{doctor.email}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Room</span>
              <span className="font-medium text-slate-800">
                {doctor.roomNumber}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Fee</span>
              <span className="font-medium text-slate-800">
                ₹{doctor.consultationFee}
              </span>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900">
              Professional Information
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Info label="Qualification" value={doctor.qualification} />
              <Info
                label="Experience"
                value={`${doctor.experienceYears} years`}
              />
              <Info label="Available From" value={doctor.availableTimeStart} />
              <Info label="Available To" value={doctor.availableTimeEnd} />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900">
              Available Days
            </h3>

            <div className="mt-5 flex flex-wrap gap-3">
              {doctor.availableDays.map((day) => (
                <span
                  key={day}
                  className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700"
                >
                  {day}
                </span>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900">Biography</h3>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {doctor.bio || "-"}
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Appointments
            </h3>

            <div className="mt-5 space-y-3">
              {doctorAppointments.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  No appointments found
                </div>
              ) : (
                doctorAppointments.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-slate-200 px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {item.patientName}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.date} • {item.time}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
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

export default DoctorDetailsPage;
