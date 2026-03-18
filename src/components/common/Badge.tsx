import { cn } from "../../lib/utils";

const Badge = ({ text }: { text: string }) => {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        text === "Active" && "bg-emerald-50 text-emerald-700",
        text === "Admitted" && "bg-blue-50 text-blue-700",
        text === "Discharged" && "bg-slate-100 text-slate-700",
        text === "On Leave" && "bg-amber-50 text-amber-700",
        text === "Unavailable" && "bg-rose-50 text-rose-700",
      )}
    >
      {text}
    </span>
  );
};

export default Badge;
