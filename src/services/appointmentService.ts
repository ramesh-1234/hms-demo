import { getLocalData, setLocalData } from "../db/localStorage";
import { STORAGE_KEYS } from "../db/storageKeys";
import type { Appointment, AppointmentStatus } from "../types/appointment";

const getAppointments = (): Appointment[] => {
  return getLocalData<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, []);
};

const saveAppointments = (appointments: Appointment[]) => {
  setLocalData(STORAGE_KEYS.APPOINTMENTS, appointments);
};

const generateAppointmentNumber = (appointments: Appointment[]) => {
  const next = appointments.length + 1001;
  return `APT-${next}`;
};

export const appointmentService = {
  getAll: () => {
    return getAppointments().sort((a, b) => {
      const aDate = new Date(`${a.date}T${a.time}`).getTime();
      const bDate = new Date(`${b.date}T${b.time}`).getTime();
      return bDate - aDate;
    });
  },

  getToday: () => {
    const today = new Date().toISOString().split("T")[0];
    return getAppointments()
      .filter((item) => item.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  },

  getById: (id: string) => {
    return getAppointments().find((item) => item.id === id) || null;
  },

  create: (
    payload: Omit<
      Appointment,
      "id" | "appointmentNumber" | "createdAt" | "updatedAt"
    >,
  ) => {
    const appointments = getAppointments();

    const newAppointment: Appointment = {
      ...payload,
      id: crypto.randomUUID(),
      appointmentNumber: generateAppointmentNumber(appointments),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveAppointments([newAppointment, ...appointments]);
    return newAppointment;
  },

  update: (id: string, payload: Partial<Appointment>) => {
    const appointments = getAppointments();

    const updatedAppointments = appointments.map((item) =>
      item.id === id
        ? {
            ...item,
            ...payload,
            updatedAt: new Date().toISOString(),
          }
        : item,
    );

    saveAppointments(updatedAppointments);
    return updatedAppointments.find((item) => item.id === id) || null;
  },

  updateStatus: (id: string, status: AppointmentStatus) => {
    return appointmentService.update(id, { status });
  },

  remove: (id: string) => {
    const appointments = getAppointments().filter((item) => item.id !== id);
    saveAppointments(appointments);
  },
};
