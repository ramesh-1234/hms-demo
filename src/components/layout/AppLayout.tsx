import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden bg-slate-50">
      <div className="flex h-full">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
