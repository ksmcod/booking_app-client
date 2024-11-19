import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hotelTypes } from "@/utils/hotelConfigs";

interface HotelTypeFilterProps {
  selectedHotelType: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HotelTypeFilter({
  selectedHotelType,
  onChange,
}: HotelTypeFilterProps) {
  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-2">Hotel Type</h4>
      <div className="space-y-2">
        {hotelTypes.map((hotelType) => (
          <Label
            key={hotelType.type}
            htmlFor={hotelType.type}
            className="flex items-center gap-2"
          >
            <Input
              type="checkbox"
              id={hotelType.type}
              value={hotelType.type}
              className="size-6 accent-blue-600"
              checked={selectedHotelType.includes(hotelType.type)}
              onChange={onChange}
            />

            <span className="text-base">{hotelType.type}</span>
          </Label>
        ))}
      </div>
    </div>
  );
}
