import ButtonLink from "@/components/ui/buttonLink";

export default function MyHotelsPage() {
  return (
    <div className="p-3">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <ButtonLink label="Add Hotel" target="/add-hotel" />
      </div>
    </div>
  );
}
