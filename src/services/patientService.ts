import { getLocalData, setLocalData } from "../db/localStorage";
import { STORAGE_KEYS } from "../db/storageKeys";
import type { Patient } from "../types/patient";

const getPatients = (): Patient[] => {
  return getLocalData<Patient[]>(STORAGE_KEYS.PATIENTS, []);
};

const savePatients = (patients: Patient[]) => {
  setLocalData(STORAGE_KEYS.PATIENTS, patients);
};

const generatePatientCode = (patients: Patient[]) => {
  const next = patients.length + 1001;
  return `P-${next}`;
};

export const patientService = {
  getAll: () => {
    return getPatients().sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },

  getById: (id: string) => {
    return getPatients().find((patient) => patient.id === id) || null;
  },

  create: (
    payload: Omit<Patient, "id" | "patientCode" | "createdAt" | "updatedAt">,
  ) => {
    const patients = getPatients();

    const newPatient: Patient = {
      ...payload,
      id: crypto.randomUUID(),
      patientCode: generatePatientCode(patients),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    savePatients([newPatient, ...patients]);
    return newPatient;
  },

  update: (id: string, payload: Partial<Patient>) => {
    const patients = getPatients();

    const updatedPatients = patients.map((patient) =>
      patient.id === id
        ? {
            ...patient,
            ...payload,
            updatedAt: new Date().toISOString(),
          }
        : patient,
    );

    savePatients(updatedPatients);
    return updatedPatients.find((patient) => patient.id === id) || null;
  },

  remove: (id: string) => {
    const patients = getPatients().filter((patient) => patient.id !== id);
    savePatients(patients);
  },
};
