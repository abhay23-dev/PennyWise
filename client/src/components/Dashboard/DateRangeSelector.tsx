interface DateRangeSelectorProps {
  selected: string;
  onChange: (range: string) => void;
}

export default function DateRangeSelector({selected, onChange}: DateRangeSelectorProps) {
  const options = [
    {value: "30", label: "Last 30 Days"},
    {value: "60", label: "Last 60 Days"},
    {value: "90", label: "Last 90 Days"},
    {value: "180", label: "Last 180 Days"},
    {value: "365", label: "Last 365 Days"},
    {value: "all", label: "all"},
  ]
  return (
    <div>
      <label htmlFor="date-range">Time Period</label>
      <select name="date-range" id="date-range" value={selected} onChange={(e) => onChange(e.target.value)}>
        {
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        }
      </select>
    </div>
  );
}