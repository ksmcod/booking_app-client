import { Calendar } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarComponentProps {
  dateRange: RangeKeyDict;
  onChange: (dateRange: RangeKeyDict) => void;
}

export default function CalendarComponent({
  dateRange,
  onChange,
}: CalendarComponentProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <div
      ref={calendarRef}
      className="relative bg-white h-full rounded-sm flex justify-center items-center gap-2 p-2 hover:cursor-pointer red-"
      onClick={(e) => {
        e.stopPropagation();
        setShowCalendar(true);
      }}
    >
      {showCalendar && (
        <div className="absolute mt-1 border shadow-md top-full rounded-sm">
          <DateRange
            minDate={new Date()}
            ranges={[dateRange.selection]}
            rangeColors={["#1e40af"]}
            color="#dc2626"
            direction="vertical"
            showDateDisplay={false}
            onChange={(item) => onChange(item)}
          />
        </div>
      )}
      <Calendar />
      <span>Select date</span>
    </div>
  );
}
