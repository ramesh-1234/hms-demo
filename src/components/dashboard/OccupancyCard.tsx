import Card from "../common/Card";

interface OccupancyCardProps {
  title: string;
  used: number;
  total: number;
  colorClass?: string;
}

const OccupancyCard = ({
  title,
  used,
  total,
  colorClass = "bg-teal-500",
}: OccupancyCardProps) => {
  const percent = Math.min(100, Math.round((used / total) * 100));

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {used} / {total} occupied
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">{percent}%</p>
          <p className="text-xs text-slate-400">Utilization</p>
        </div>
      </div>

      <div className="mt-4 h-3 w-full rounded-full bg-slate-100">
        <div
          className={`h-3 rounded-full ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </Card>
  );
};

export default OccupancyCard;
