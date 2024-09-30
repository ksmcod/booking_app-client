interface LoaderProps {
  size?: number;
}
export default function Loader({ size = 7 }: LoaderProps) {
  return <span className={`loader border-4 w-${size} h-${size}`}></span>;
  return <span className="loader border-4 w-7 h-7"></span>;
}
