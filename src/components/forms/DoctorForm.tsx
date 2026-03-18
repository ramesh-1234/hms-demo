import { useEffect, useState } from "react";
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import type { Doctor } from "../../types/doctor";
import { fileToBase64, getInitials } from "../../lib/utils";

type DoctorFormValues = Omit<
  Doctor,
  "id" | "doctorCode" | "createdAt" | "updatedAt"
>;

interface DoctorFormProps {
  initialValues?: Partial<DoctorFormValues>;
  onSubmit: (values: DoctorFormValues) => void;
  submitting?: boolean;
}

const dayOptions = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultValues: DoctorFormValues = {
  fullName: "",
  email: "",
  phone: "",
  gender: "Male",
  department: "",
  specialization: "",
  qualification: "",
  experienceYears: 0,
  consultationFee: 0,
  availableDays: [],
  availableTimeStart: "",
  availableTimeEnd: "",
  roomNumber: "",
  status: "Active",
  bio: "",
  photo: "",
};

const DoctorForm = ({
  initialValues,
  onSubmit,
  submitting = false,
}: DoctorFormProps) => {
  const [form, setForm] = useState<DoctorFormValues>(defaultValues);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...defaultValues,
        ...initialValues,
      });
    }
  }, [initialValues]);

  const updateField = (
    key: keyof DoctorFormValues,
    value: string | number | string[],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDayToggle = (day: string) => {
    const exists = form.availableDays.includes(day);

    setForm((prev) => ({
      ...prev,
      availableDays: exists
        ? prev.availableDays.filter((item) => item !== day)
        : [...prev.availableDays, day],
    }));
  };

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, photo: base64 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...form,
      experienceYears: Number(form.experienceYears),
      consultationFee: Number(form.consultationFee),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-slate-900">
          Doctor Information
        </h3>

        <div className="mt-5 grid gap-5 md:grid-cols-[140px_1fr]">
          <div>
            <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl bg-slate-100 text-2xl font-bold text-slate-500">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitials(form.fullName || "D")
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              className="mt-3 block w-full text-xs text-slate-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Enter doctor name"
              required
            />
            <Input
              label="Email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Enter email"
              required
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Enter phone"
              required
            />
            <Select
              label="Gender"
              value={form.gender}
              onChange={(e) => updateField("gender", e.target.value)}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
            />
            <Input
              label="Department"
              value={form.department}
              onChange={(e) => updateField("department", e.target.value)}
              placeholder="Department"
              required
            />
            <Input
              label="Specialization"
              value={form.specialization}
              onChange={(e) => updateField("specialization", e.target.value)}
              placeholder="Specialization"
              required
            />
            <Input
              label="Qualification"
              value={form.qualification}
              onChange={(e) => updateField("qualification", e.target.value)}
              placeholder="Qualification"
              required
            />
            <Input
              label="Experience (Years)"
              type="number"
              value={form.experienceYears || ""}
              onChange={(e) =>
                updateField("experienceYears", Number(e.target.value))
              }
              placeholder="Experience"
              required
            />
            <Input
              label="Consultation Fee"
              type="number"
              value={form.consultationFee || ""}
              onChange={(e) =>
                updateField("consultationFee", Number(e.target.value))
              }
              placeholder="Fee"
              required
            />
            <Input
              label="Room Number"
              value={form.roomNumber}
              onChange={(e) => updateField("roomNumber", e.target.value)}
              placeholder="Room number"
              required
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) => updateField("status", e.target.value)}
              options={[
                { label: "Active", value: "Active" },
                { label: "On Leave", value: "On Leave" },
                { label: "Unavailable", value: "Unavailable" },
              ]}
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">Availability</h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input
            label="Available From"
            type="time"
            value={form.availableTimeStart}
            onChange={(e) => updateField("availableTimeStart", e.target.value)}
            required
          />
          <Input
            label="Available To"
            type="time"
            value={form.availableTimeEnd}
            onChange={(e) => updateField("availableTimeEnd", e.target.value)}
            required
          />
        </div>

        <div className="mt-5">
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Available Days
          </label>

          <div className="flex flex-wrap gap-3">
            {dayOptions.map((day) => {
              const active = form.availableDays.includes(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDayToggle(day)}
                  className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">Biography</h3>
        <div className="mt-5">
          <textarea
            value={form.bio || ""}
            onChange={(e) => updateField("bio", e.target.value)}
            placeholder="Short doctor profile"
            rows={5}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          />
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Doctor"}
        </Button>
      </div>
    </form>
  );
};

export default DoctorForm;
