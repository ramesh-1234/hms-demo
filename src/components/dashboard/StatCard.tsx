import type { ReactNode } from "react";
import Card from "../common/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  trend?: string;
}

const StatCard = ({ title, value, icon, subtitle, trend }: StatCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-teal-50 blur-2xl" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              {trend}
            </div>
          )}
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 p-3 text-white shadow-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
