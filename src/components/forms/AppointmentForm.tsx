import { useEffect, useMemo, useState } from "react";
import Card from "../common/Card";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import type { Appointment } from "../../types/appointment";
import type { Patient } from "../../types/patient";

type AppointmentFormValues = Omit<
  Appointment,
  "id" | "appointmentNumber" | "createdAt" | "updatedAt"
>;

interface AppointmentFormProps {
  patients: Patient[];
  initialValues?: Partial<AppointmentFormValues>;
  onSubmit: (values: AppointmentFormValues) => void;
  submitting?: boolean;
}

const defaultValues: AppointmentFormValues = {
  patientId: "",
  patientName: "",
  doctorName: "",
  department: "",
  date: "",
  time: "",
  reason: "",
  status: "Scheduled",
  priority: "Normal",
  notes: "",
};

const AppointmentForm = ({
  patients,
  initialValues,
  onSubmit,
  submitting = false,
}: AppointmentFormProps) => {
  const [form, setForm] = useState<AppointmentFormValues>(defaultValues);

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...defaultValues,
        ...initialValues,
      });
    }
  }, [initialValues]);

  const patientOptions = useMemo(() => {
    return [
      { label: "Select Patient", value: "" },
      ...patients.map((patient) => ({
        label: `${patient.fullName} (${patient.patientCode})`,
        value: patient.id,
      })),
    ];
  }, [patients]);

  const handlePatientChange = (patientId: string) => {
    const selectedPatient = patients.find((item) => item.id === patientId);

    setForm((prev) => ({
      ...prev,
      patientId,
      patientName: selectedPatient?.fullName || "",
      doctorName: selectedPatient?.doctorAssigned || prev.doctorName,
    }));
  };

  const updateField = (key: keyof AppointmentFormValues, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-slate-900">
          Appointment Details
        </h3>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Select
            label="Patient"
            value={form.patientId}
            onChange={(e) => handlePatientChange(e.target.value)}
            options={patientOptions}
            required
          />

          <Input
            label="Patient Name"
            value={form.patientName}
            onChange={(e) => updateField("patientName", e.target.value)}
            placeholder="Patient name"
            required
          />

          <Input
            label="Doctor Name"
            value={form.doctorName}
            onChange={(e) => updateField("doctorName", e.target.value)}
            placeholder="Doctor name"
            required
          />

          <Input
            label="Department"
            value={form.department}
            onChange={(e) => updateField("department", e.target.value)}
            placeholder="Department"
            required
          />

          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
            required
          />

          <Input
            label="Time"
            type="time"
            value={form.time}
            onChange={(e) => updateField("time", e.target.value)}
            required
          />

          <Select
            label="Priority"
            value={form.priority}
            onChange={(e) => updateField("priority", e.target.value)}
            options={[
              { label: "Normal", value: "Normal" },
              { label: "Urgent", value: "Urgent" },
            ]}
          />

          <Select
            label="Status"
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            options={[
              { label: "Scheduled", value: "Scheduled" },
              { label: "Checked In", value: "Checked In" },
              { label: "In Consultation", value: "In Consultation" },
              { label: "Completed", value: "Completed" },
              { label: "Cancelled", value: "Cancelled" },
            ]}
          />

          <div className="md:col-span-2">
            <Input
              label="Reason"
              value={form.reason}
              onChange={(e) => updateField("reason", e.target.value)}
              placeholder="Reason for appointment"
              required
            />
          </div>

          <div className="md:col-span-2">
            <Input
              label="Notes"
              value={form.notes || ""}
              onChange={(e) => updateField("notes", e.target.value)}
              placeholder="Additional notes"
            />
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Appointment"}
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
