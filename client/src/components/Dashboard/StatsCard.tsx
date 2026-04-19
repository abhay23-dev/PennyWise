import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string,
  value: string | number;
}

export default function StatsCard({icon: Icon, label, value}: StatsCardProps) {
  return (
    <div className="flex flex-col gap-4 p-6 border border-purple-950 rounded-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-900/30 rounded-sm">
          <Icon className="size-5 text-purple-400" />
        </div>
        <p className="text-sm font-medium text-gray-400">{label}</p>
      </div>
      <p className="text-3xl font-bold text-gray-100">{value}</p>
    </div>
  )
}