interface ButtonProps {
  disabled?: boolean;
  variant?: "primary" | "black";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  disabled,
  children,
  onClick,
  variant,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${"w-full text-white font-bold p-2 text-xl rounded flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-60 active:opacity-90 transition-all"}
                
                ${variant === "primary" && "bg-blue-600 hover:bg-blue-500"}
                ${
                  variant === "black" &&
                  "bg-black gap-4 hover:bg-gray-900 active:opacity-85 text-base"
                }
                ${className}
                `}
    >
      {children}
    </button>
  );
}
