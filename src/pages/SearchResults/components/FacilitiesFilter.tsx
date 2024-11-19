import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hotelFacilities } from "@/utils/hotelConfigs";
interface FacilityFilterProps {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FacilityFilter({
  selectedFacilities,
  onChange,
}: FacilityFilterProps) {
  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-2">Facilities</h4>
      <div className="space-y-2">
        {hotelFacilities.map((facility) => (
          <Label
            key={facility}
            htmlFor={facility}
            className="flex items-center gap-2"
          >
            <Input
              type="checkbox"
              id={facility}
              value={facility}
              className="size-6 accent-blue-600"
              checked={selectedFacilities.includes(facility)}
              onChange={onChange}
            />

            <span className="text-base">{facility}</span>
          </Label>
        ))}
      </div>
    </div>
  );
}
