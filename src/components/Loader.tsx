interface LoaderProps {
  size?: number;
}
export default function Loader({ size = 6 }: LoaderProps) {
  return <span className={`loader w-${size} h-${size} border-4`}></span>;
}
