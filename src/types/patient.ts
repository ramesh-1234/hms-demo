export type Gender = "Male" | "Female" | "Other";

export type PatientStatus = "Active" | "Admitted" | "Discharged";

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface Patient {
  id: string;
  patientCode: string;
  fullName: string;
  age: number;
  gender: Gender;
  phone: string;
  email: string;
  bloodGroup: string;
  address: string;
  disease: string;
  doctorAssigned: string;
  status: PatientStatus;
  dateOfBirth?: string;
  admittedOn?: string;
  photo?: string;
  emergencyContact: EmergencyContact;
  createdAt: string;
  updatedAt: string;
}
