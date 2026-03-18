import { cn } from "../../lib/utils";

const StatusBadge = ({ text }: { text: string }) => {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        text === "Scheduled" && "bg-blue-50 text-blue-700",
        text === "Checked In" && "bg-amber-50 text-amber-700",
        text === "In Consultation" && "bg-purple-50 text-purple-700",
        text === "Completed" && "bg-emerald-50 text-emerald-700",
        text === "Cancelled" && "bg-rose-50 text-rose-700",
        text === "Urgent" && "bg-rose-50 text-rose-700",
        text === "Normal" && "bg-slate-100 text-slate-700",
      )}
    >
      {text}
    </span>
  );
};

export default StatusBadge;
