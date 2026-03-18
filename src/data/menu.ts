import type { MenuItem } from "../types/common";

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    roles: ["admin", "doctor", "reception", "patient"],
  },
  {
    label: "Patients",
    path: "/patients",
    roles: ["admin", "doctor", "reception"],
  },
  {
    label: "Doctors",
    path: "/doctors",
    roles: ["admin", "reception"],
  },
  {
    label: "Appointments",
    path: "/appointments",
    roles: ["admin", "doctor", "reception", "patient"],
  },
  {
    label: "Billing",
    path: "/billing",
    roles: ["admin", "reception"],
  },
  {
    label: "Lab",
    path: "/lab",
    roles: ["admin", "doctor"],
  },
  {
    label: "Pharmacy",
    path: "/pharmacy",
    roles: ["admin", "doctor"],
  },
  {
    label: "Settings",
    path: "/settings",
    roles: ["admin", "doctor", "reception", "patient"],
  },
];
