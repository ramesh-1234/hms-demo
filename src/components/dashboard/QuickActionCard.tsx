import type { ReactNode } from "react";

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  onClick?: () => void;
}

const QuickActionCard = ({
  title,
  subtitle,
  icon,
  onClick,
}: QuickActionCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700 transition group-hover:bg-teal-50 group-hover:text-teal-700">
          {icon}
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;
