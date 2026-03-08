"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        align === "left" && "max-w-2xl",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 rounded-full bg-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          {badge}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-3",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-text-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
