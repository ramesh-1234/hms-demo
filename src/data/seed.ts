import { getLocalData, setLocalData } from "../db/localStorage";
import { STORAGE_KEYS } from "../db/storageKeys";

import type { User } from "../types/auth";

export const seedAppData = () => {
  const existingUsers = getLocalData<User[]>(STORAGE_KEYS.USERS, []);

  if (existingUsers.length > 0) return;

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
  setLocalData(STORAGE_KEYS.PATIENTS, []);
  setLocalData(STORAGE_KEYS.DOCTORS, []);
  setLocalData(STORAGE_KEYS.APPOINTMENTS, []);
  setLocalData(STORAGE_KEYS.BILLS, []);
};
