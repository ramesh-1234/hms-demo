import { getLocalData, setLocalData } from "../db/localStorage";
import { STORAGE_KEYS } from "../db/storageKeys";
import type { Doctor } from "../types/doctor";

const getDoctors = (): Doctor[] => {
  return getLocalData<Doctor[]>(STORAGE_KEYS.DOCTORS, []);
};

const saveDoctors = (doctors: Doctor[]) => {
  setLocalData(STORAGE_KEYS.DOCTORS, doctors);
};

const generateDoctorCode = (doctors: Doctor[]) => {
  const next = doctors.length + 1001;
  return `D-${next}`;
};

export const doctorService = {
  getAll: () => {
    return getDoctors().sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },

  getById: (id: string) => {
    return getDoctors().find((doctor) => doctor.id === id) || null;
  },

  create: (
    payload: Omit<Doctor, "id" | "doctorCode" | "createdAt" | "updatedAt">,
  ) => {
    const doctors = getDoctors();

    const newDoctor: Doctor = {
      ...payload,
      id: crypto.randomUUID(),
      doctorCode: generateDoctorCode(doctors),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveDoctors([newDoctor, ...doctors]);
    return newDoctor;
  },

  update: (id: string, payload: Partial<Doctor>) => {
    const doctors = getDoctors();

    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === id
        ? {
            ...doctor,
            ...payload,
            updatedAt: new Date().toISOString(),
          }
        : doctor,
    );

    saveDoctors(updatedDoctors);
    return updatedDoctors.find((doctor) => doctor.id === id) || null;
  },

  remove: (id: string) => {
    const doctors = getDoctors().filter((doctor) => doctor.id !== id);
    saveDoctors(doctors);
  },
};
