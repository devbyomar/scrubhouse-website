"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-navy text-white hover:bg-navy-light shadow-md hover:shadow-lg active:scale-[0.98]",
        primary:
          "bg-gradient-to-r from-navy to-blue-accent text-white hover:from-navy-light hover:to-navy shadow-md hover:shadow-lg active:scale-[0.98]",
        cyan: "bg-cyan text-navy-dark font-bold hover:bg-cyan-dark shadow-md hover:shadow-lg active:scale-[0.98]",
        outline:
          "border-2 border-navy text-navy hover:bg-navy hover:text-white",
        "outline-light":
          "border-2 border-white/30 text-white hover:bg-white/10",
        ghost: "text-navy hover:bg-navy/5",
        "ghost-light": "text-white/80 hover:text-white hover:bg-white/10",
        link: "text-navy underline-offset-4 hover:underline",
        destructive: "bg-red-500 text-white hover:bg-red-600",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        default: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
