import { getLocalData, setLocalData } from "../db/localStorage";
import { STORAGE_KEYS } from "../db/storageKeys";
import type { User } from "../types/auth";
import type { Patient } from "../types/patient";
import type { Appointment } from "../types/appointment";
import type { Doctor } from "../types/doctor";

export const seedAppData = () => {
  const existingUsers = getLocalData<User[]>(STORAGE_KEYS.USERS, []);
  const existingPatients = getLocalData<Patient[]>(STORAGE_KEYS.PATIENTS, []);
  const existingAppointments = getLocalData<Appointment[]>(
    STORAGE_KEYS.APPOINTMENTS,
    [],
  );
  const existingDoctors = getLocalData<Doctor[]>(STORAGE_KEYS.DOCTORS, []);

  if (existingUsers.length === 0) {
    const demoUsers: User[] = [
      {
        id: "u1",
        name: "Super Admin",
        email: "admin@hms.com",
        password: "123456",
        role: "admin",
        department: "Management",
        phone: "9999999991",
      },
      {
        id: "u2",
        name: "Dr. Ramesh",
        email: "doctor@hms.com",
        password: "123456",
        role: "doctor",
        department: "Cardiology",
        phone: "9999999992",
      },
      {
        id: "u3",
        name: "Reception Desk",
        email: "reception@hms.com",
        password: "123456",
        role: "reception",
        department: "Front Office",
        phone: "9999999993",
      },
      {
        id: "u4",
        name: "Patient Kumar",
        email: "patient@hms.com",
        password: "123456",
        role: "patient",
        phone: "9999999994",
      },
    ];

    setLocalData(STORAGE_KEYS.USERS, demoUsers);
  }

  if (existingDoctors.length === 0) {
    const demoDoctors: Doctor[] = [
      {
        id: "d1",
        doctorCode: "D-1001",
        fullName: "Dr. Ramesh",
        email: "dr.ramesh@hms.com",
        phone: "9876500011",
        gender: "Male",
        department: "Cardiology",
        specialization: "Interventional Cardiology",
        qualification: "MBBS, MD, DM Cardiology",
        experienceYears: 12,
        consultationFee: 800,
        availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
        availableTimeStart: "09:00",
        availableTimeEnd: "14:00",
        roomNumber: "C-201",
        status: "Active",
        bio: "Experienced cardiologist focused on patient-centric care.",
        photo: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "d2",
        doctorCode: "D-1002",
        fullName: "Dr. Priya",
        email: "dr.priya@hms.com",
        phone: "9876500012",
        gender: "Female",
        department: "General Medicine",
        specialization: "Internal Medicine",
        qualification: "MBBS, MD",
        experienceYears: 8,
        consultationFee: 600,
        availableDays: ["Monday", "Thursday", "Friday", "Saturday"],
        availableTimeStart: "10:00",
        availableTimeEnd: "16:00",
        roomNumber: "G-104",
        status: "Active",
        bio: "General physician handling OPD and routine care.",
        photo: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setLocalData(STORAGE_KEYS.DOCTORS, demoDoctors);
  }

  if (existingPatients.length === 0) {
    const demoPatients: Patient[] = [
      {
        id: "p1",
        patientCode: "P-1001",
        fullName: "Ravi Kumar",
        age: 34,
        gender: "Male",
        phone: "9876543210",
        email: "ravi@example.com",
        bloodGroup: "B+",
        address: "Bhopal, Madhya Pradesh",
        disease: "Chest Pain",
        doctorAssigned: "Dr. Ramesh",
        status: "Active",
        dateOfBirth: "1991-04-10",
        photo: "",
        emergencyContact: {
          name: "Sita Kumar",
          phone: "9876500001",
          relation: "Wife",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "p2",
        patientCode: "P-1002",
        fullName: "Anjali Verma",
        age: 28,
        gender: "Female",
        phone: "9123456780",
        email: "anjali@example.com",
        bloodGroup: "O+",
        address: "Indore, Madhya Pradesh",
        disease: "Fever",
        doctorAssigned: "Dr. Priya",
        status: "Admitted",
        admittedOn: new Date().toISOString(),
        dateOfBirth: "1997-02-18",
        photo: "",
        emergencyContact: {
          name: "Mahesh Verma",
          phone: "9123400002",
          relation: "Brother",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setLocalData(STORAGE_KEYS.PATIENTS, demoPatients);
  }

  if (existingAppointments.length === 0) {
    const demoAppointments: Appointment[] = [
      {
        id: "a1",
        appointmentNumber: "APT-1001",
        patientId: "p1",
        patientName: "Ravi Kumar",
        doctorName: "Dr. Ramesh",
        department: "Cardiology",
        date: new Date().toISOString().split("T")[0],
        time: "09:30",
        reason: "Chest pain follow-up",
        status: "Scheduled",
        priority: "Urgent",
        notes: "ECG review required",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "a2",
        appointmentNumber: "APT-1002",
        patientId: "p2",
        patientName: "Anjali Verma",
        doctorName: "Dr. Priya",
        department: "General Medicine",
        date: new Date().toISOString().split("T")[0],
        time: "10:15",
        reason: "Fever and weakness",
        status: "Checked In",
        priority: "Normal",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setLocalData(STORAGE_KEYS.APPOINTMENTS, demoAppointments);
  }

  setLocalData(STORAGE_KEYS.BILLS, getLocalData(STORAGE_KEYS.BILLS, []));
};
