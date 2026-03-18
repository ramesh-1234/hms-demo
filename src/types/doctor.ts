export type DoctorStatus = "Active" | "On Leave" | "Unavailable";

export interface Doctor {
  id: string;
  doctorCode: string;
  fullName: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "Other";
  department: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  consultationFee: number;
  availableDays: string[];
  availableTimeStart: string;
  availableTimeEnd: string;
  roomNumber: string;
  status: DoctorStatus;
  bio?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}
