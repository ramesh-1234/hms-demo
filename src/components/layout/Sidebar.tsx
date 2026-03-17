import type React from "react";
import {
  Activity,
  CalendarDays,
  CreditCard,
  FlaskConical,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { menuItems } from "../../data/menu";
import { useAuth } from "../../hooks/useAuth";
import { useAppContext } from "../../context/AppContext";

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard size={18} />,
  Patients: <Users size={18} />,
  Doctors: <Stethoscope size={18} />,
  Appointments: <CalendarDays size={18} />,
  Billing: <CreditCard size={18} />,
  Lab: <FlaskConical size={18} />,
  Pharmacy: <Activity size={18} />,
  Settings: <Settings size={18} />,
};

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { user } = useAuth();

  const allowedMenu = menuItems.filter((item) =>
    item.roles.includes(user?.role || ""),
  );

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-shrink-0 border-b border-slate-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-lg font-bold text-white shadow-lg">
            H
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">MediCore HMS</h2>
            <p className="text-sm text-slate-500">Hospital Demo Panel</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {allowedMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <span>{iconMap[item.label]}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useAppContext();

  return (
    <>
      <aside className="hidden h-screen w-72 flex-shrink-0 border-r border-slate-200 bg-white xl:flex xl:flex-col">
        <SidebarContent />
      </aside>

      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 transition xl:hidden ${
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[84%] max-w-[320px] transform border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 xl:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end border-b border-slate-200 px-4 py-4">
          <button
            onClick={closeSidebar}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <SidebarContent onNavigate={closeSidebar} />
      </aside>
    </>
  );
};

export default Sidebar;
