import { Bell, Menu, Search } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { openSidebar } = useAppContext();

  return (
    <header className="sticky top-0 z-30 flex-shrink-0 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-3 px-4 py-4 md:px-6 lg:px-7">
        <div className="ml-auto flex items-center gap-3 md:gap-4">
          <button
            onClick={openSidebar}
            className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 xl:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="hidden flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 md:flex">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search patients, doctors, appointments..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-700">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="text-xs capitalize text-slate-500">{user?.role}</p>
          </div>

          <button
            onClick={logout}
            className="rounded-2xl bg-slate-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 md:px-4"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 pb-4 md:hidden">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
