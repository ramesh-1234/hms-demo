export type AppointmentStatus =
  | "Scheduled"
  | "Checked In"
  | "In Consultation"
  | "Completed"
  | "Cancelled";

export type AppointmentPriority = "Normal" | "Urgent";

export interface Appointment {
  id: string;
  appointmentNumber: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
  priority: AppointmentPriority;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
