import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StarRatingFilterProps {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StarRatingFilter({
  selectedStars,
  onChange,
}: StarRatingFilterProps) {
  return (
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-2">Property Rating</h4>
      <div className="space-y-2">
        {["5", "4", "3", "2", "1"].map((star) => (
          <Label key={star} htmlFor={star} className="flex items-center gap-2">
            <Input
              type="checkbox"
              id={star}
              value={star}
              className="size-6 accent-blue-600"
              checked={selectedStars.includes(star)}
              onChange={onChange}
            />

            <span className="text-base">{star}</span>
          </Label>
        ))}
      </div>
    </div>
  );
}
