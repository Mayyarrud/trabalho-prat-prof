type ForecastMetricProps = {
  label: string;
  value: string;
  className: string;
};

export default function ForecastMetric({
  label,
  value,
  className,
}: ForecastMetricProps) {
  return (
    <div className={`min-w-0 rounded-xl p-3 ${className}`}>
      <dt className="text-xs text-[#6B665C]">{label}</dt>
      <dd className="mt-2 text-sm font-medium">{value}</dd>
    </div>
  );
}
