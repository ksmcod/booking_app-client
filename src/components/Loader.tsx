interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <span
      className={`loading loading-spinner text-blue-500 ${className}`}
    ></span>
  );
}
