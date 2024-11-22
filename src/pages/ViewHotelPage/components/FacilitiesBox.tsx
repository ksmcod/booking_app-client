interface Props {
  facility: string;
}

export default function FacilitiesBox({ facility }: Props) {
  return (
    <div className="border border-slate-300 rounded-sm p-3">{facility}</div>
  );
}
