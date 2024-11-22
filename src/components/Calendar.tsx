import { Calendar1 } from "lucide-react";
import { useRef, useState, useEffect, useMemo } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarComponentProps {
  dateRange: RangeKeyDict;
  onChange: (dateRange: RangeKeyDict) => void;
  position: "up" | "down";
}

export default function CalendarComponent({
  dateRange,
  onChange,
  position,
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

  const calendarLabel = useMemo(() => {
    if (dateRange.selection.startDate && dateRange.selection.endDate) {
      // if (
      //   dateRange.selection.startDate.getTime() ===
      //   dateRange.selection.endDate.getTime()
      // ) {
      //   return "Select a date";
      // }
      if (
        dateRange.selection.startDate.getTime() ===
          new Date(new Date().setHours(0, 0, 0, 0)).getTime() &&
        dateRange.selection.endDate.getTime() > new Date().getTime()
      ) {
        const startDate = dateRange.selection.startDate.toLocaleString(
          "default",
          { dateStyle: "medium" }
        );
        const endDate = dateRange.selection.endDate.toLocaleString("default", {
          dateStyle: "medium",
        });

        return `${startDate} - ${endDate}`;
      }

      if (
        dateRange.selection.startDate.getTime() >= new Date().getTime() &&
        dateRange.selection.endDate.getTime() > new Date().getTime()
      ) {
        const startDate = dateRange.selection.startDate.toLocaleString(
          "default",
          { dateStyle: "medium" }
        );
        const endDate = dateRange.selection.endDate.toLocaleString("default", {
          dateStyle: "medium",
        });

        return `${startDate} - ${endDate}`;
      }
    }

    return "Select date";
  }, [dateRange.selection.endDate, dateRange.selection.startDate]);

  return (
    <div
      ref={calendarRef}
      className="relative bg-white h-full rounded-sm flex justify-center items-center gap-2 p-2 hover:cursor-pointer w-full"
      onClick={(e) => {
        e.stopPropagation();
        setShowCalendar(true);
      }}
    >
      {showCalendar && (
        <div
          className={`absolute border shadow-md rounded-sm
         
         ${position == "down" && "top-full mt-1"}
         ${position == "up" && "bottom-full mb-2"}
         `}
        >
          <DateRange
            minDate={new Date()}
            ranges={[dateRange.selection]}
            rangeColors={["#1e40af"]}
            color="#dc2626"
            direction="vertical"
            showDateDisplay={false}
            onChange={(item) => onChange(item)}
            className=""
          />
        </div>
      )}
      <Calendar1 />
      <span>{calendarLabel}</span>
    </div>
  );
}
