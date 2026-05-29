import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-3 font-medium transition-colors duration-300",
        variant === "primary" && "bg-white text-black hover:bg-gray-200",
        variant === "outline" &&
          "border border-white text-white hover:bg-white hover:text-black",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
