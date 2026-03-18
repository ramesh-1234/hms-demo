import { useEffect, useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import Card from "../common/Card";
import type { Patient } from "../../types/patient";
import { fileToBase64, getInitials } from "../../lib/utils";

type PatientFormValues = Omit<
  Patient,
  "id" | "patientCode" | "createdAt" | "updatedAt"
>;

interface PatientFormProps {
  initialValues?: Partial<PatientFormValues>;
  onSubmit: (values: PatientFormValues) => void;
  submitting?: boolean;
}

const defaultValues: PatientFormValues = {
  fullName: "",
  age: 0,
  gender: "Male",
  phone: "",
  email: "",
  bloodGroup: "A+",
  address: "",
  disease: "",
  doctorAssigned: "",
  status: "Active",
  dateOfBirth: "",
  admittedOn: "",
  photo: "",
  emergencyContact: {
    name: "",
    phone: "",
    relation: "",
  },
};

const PatientForm = ({
  initialValues,
  onSubmit,
  submitting = false,
}: PatientFormProps) => {
  const [form, setForm] = useState<PatientFormValues>(defaultValues);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...defaultValues,
        ...initialValues,
        emergencyContact: {
          ...defaultValues.emergencyContact,
          ...initialValues.emergencyContact,
        },
      });
    }
  }, [initialValues]);

  const updateField = (
    key: keyof PatientFormValues,
    value:
      | string
      | number
      | PatientFormValues["status"]
      | PatientFormValues["gender"],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateEmergency = (
    key: keyof PatientFormValues["emergencyContact"],
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [key]: value,
      },
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
      age: Number(form.age),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-slate-900">
          Basic Information
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
                getInitials(form.fullName || "P")
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
              placeholder="Enter patient name"
              required
            />
            <Input
              label="Age"
              type="number"
              value={form.age || ""}
              onChange={(e) => updateField("age", Number(e.target.value))}
              placeholder="Enter age"
              required
            />
            <Select
              label="Gender"
              value={form.gender}
              onChange={(e) =>
                updateField(
                  "gender",
                  e.target.value as PatientFormValues["gender"],
                )
              }
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
            />
            <Input
              label="Phone"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="Enter phone"
              required
            />
            <Input
              label="Email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Enter email"
            />
            <Input
              label="Date of Birth"
              type="date"
              value={form.dateOfBirth || ""}
              onChange={(e) => updateField("dateOfBirth", e.target.value)}
            />
            <Select
              label="Blood Group"
              value={form.bloodGroup}
              onChange={(e) => updateField("bloodGroup", e.target.value)}
              options={[
                { label: "A+", value: "A+" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B-", value: "B-" },
                { label: "O+", value: "O+" },
                { label: "O-", value: "O-" },
                { label: "AB+", value: "AB+" },
                { label: "AB-", value: "AB-" },
              ]}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(e) =>
                updateField(
                  "status",
                  e.target.value as PatientFormValues["status"],
                )
              }
              options={[
                { label: "Active", value: "Active" },
                { label: "Admitted", value: "Admitted" },
                { label: "Discharged", value: "Discharged" },
              ]}
            />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">
          Medical Details
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input
            label="Disease / Reason"
            value={form.disease}
            onChange={(e) => updateField("disease", e.target.value)}
            placeholder="Reason for visit"
            required
          />
          <Input
            label="Doctor Assigned"
            value={form.doctorAssigned}
            onChange={(e) => updateField("doctorAssigned", e.target.value)}
            placeholder="Doctor name"
            required
          />
          <Input
            label="Admitted On"
            type="date"
            value={form.admittedOn || ""}
            onChange={(e) => updateField("admittedOn", e.target.value)}
          />
          <Input
            label="Address"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            placeholder="Enter address"
            required
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-900">
          Emergency Contact
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Input
            label="Contact Name"
            value={form.emergencyContact.name}
            onChange={(e) => updateEmergency("name", e.target.value)}
            placeholder="Emergency contact name"
            required
          />
          <Input
            label="Phone"
            value={form.emergencyContact.phone}
            onChange={(e) => updateEmergency("phone", e.target.value)}
            placeholder="Emergency phone"
            required
          />
          <Input
            label="Relation"
            value={form.emergencyContact.relation}
            onChange={(e) => updateEmergency("relation", e.target.value)}
            placeholder="Relation"
            required
          />
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Patient"}
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;
