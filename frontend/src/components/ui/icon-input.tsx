"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowBigUpDash, EyeIcon, EyeOffIcon, LucideIcon } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  StartIcon?: LucideIcon;
  EndIcon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ StartIcon, EndIcon, className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [capsLockActive, setCapsLockActive] = React.useState(false);

    const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
      event,
    ) => {
      const capsLockOn = event.getModifierState("CapsLock");
      setCapsLockActive(capsLockOn);
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const inputClasses = cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      StartIcon && "pl-10",
      EndIcon && "pr-10",
      type === "password" && (!capsLockActive ? "pr-8" : "pr-16"),
      className,
    );

    return (
      <div className={cn("relative", className)}>
        {StartIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <StartIcon size={20} className="text-slate-500" />
          </div>
        )}
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={inputClasses}
          onKeyDown={handleKeyPress}
          ref={ref}
          {...props}
        />
        {EndIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <EndIcon size={20} className="text-slate-500" />
          </div>
        )}
        {type === "password" && (
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-x-1 pr-3">
            {showPassword ? (
              <EyeOffIcon
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
                size={20}
              />
            ) : (
              <EyeIcon
                className="cursor-pointer"
                onClick={togglePasswordVisibility}
                size={20}
              />
            )}
            {capsLockActive && type === "password" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ArrowBigUpDash size={20} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Caps Lock is on!</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
