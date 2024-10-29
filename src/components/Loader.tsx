interface LoaderProps {
  size?: number;
  className?: string;
}
export default function Loader({ size = 7, className }: LoaderProps) {
  return <span className={`loader border-4 size-${size} ${className}`}></span>;
  return <span className="loader border-4 w-7 h-7"></span>;
}
