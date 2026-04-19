import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string,
  value: string | number;
}

export default function StatsCard({icon: Icon, label, value}: StatsCardProps) {
  return (
    <div>
      <div>
        <Icon />
      </div>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  )
}